# Kids Practice Arthmetic

A small web app for kids to practice arithmetic (addition, subtraction, multiplication,
division). A parent registers an account, adds one or more kids, and each kid can take a
timed set of practice questions; results are saved so parents can review progress over time.

It's a React single-page app backed by a serverless AWS API.

## How it works

1. A parent registers (`/register`) and adds one or more kids (`/add-kid`).
2. After logging in (`/login`), the parent picks a kid (`/kids-select`) and an operation and
   difficulty (max value for each operand) on the home screen (`/home`).
3. The kid answers a timed set of questions (20 by default); the result (time taken, score,
   and every question asked) is submitted and stored.
4. Past results are available under `/my-results` and `/detailed-result`.
5. Password reset is code-based: a one-time code is emailed via SES, used on
   `/forgot-password` / `/change-password` to set a new password.

## Architecture

```
website/   React 17 SPA (Create React App, Redux Toolkit + redux-persist). Built and
           synced to an S3 bucket for static hosting.
apis/      AWS SAM app: a single Lambda function behind API Gateway, with requests routed
           by a path-matching {api+} proxy. State lives in DynamoDB; verification codes
           are emailed through SES.
```

**API Gateway → Lambda.** `apis/template.yaml` defines one function (`PracticeMyKidFunction`)
behind `GET|POST|OPTIONS /practice-my-kid/{api+}`. `apis/practice-my-kid/app.py` reads the
`api` path segment and dispatches to one handler class per endpoint:

| Path segment      | Handler                    | Auth header required |
|--------------------|-----------------------------|:---:|
| `login`            | `login_request.py`          | no |
| `register`         | `user_registration.py`      | no |
| `access_token`     | `validate_access_token.py`  | no |
| `send_code`        | `email_send_code.py`        | no |
| `add_kid`          | `add_kid.py`                | yes |
| `tests`            | `test_request.py`           | yes |
| `change_password`  | `change_password.py`        | yes, or `userName` in the body |

**DynamoDB tables** (see `apis/practice-my-kid/dynamo_keys.py`):

- `practice-my-kid-users` — accounts and their kids
- `practice-my-kid-access-tokens` — issued session tokens
- `practice-my-kid-questions` — submitted test results and question sets
- `practice-my-kids-codes` — one-time email verification / password-reset codes

## Repository layout

```
apis/
  template.yaml              SAM template (Lambda + API Gateway)
  deploy.sh                  sam package + cloudformation deploy (us-west-2)
  practice-my-kid/           Lambda source (app.py is the handler entry point)
  tests/unit/                pytest unit tests
website/
  src/pages/                 one component per screen (Home, login, registration, ...)
  src/components/            shared UI (home operation picker, progress bar, etc.)
  src/actions/, reducers/    Redux Toolkit state (mainly login/session state)
  deploy.sh                  npm run build + sync to S3
```

## Running the backend locally

Requirements: [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html),
Docker, and AWS credentials configured.

```bash
cd apis
sam build --use-container
sam local start-api      # serves the API at http://localhost:3000
```

Unit tests:

```bash
cd apis
pip install pytest pytest-mock --user
python -m pytest tests/ -v
```

See `apis/README.md` (the original SAM-generated README) for more detail on `sam local
invoke`, `sam logs`, and deploying through `sam deploy --guided`.

## Running the website locally

```bash
cd website
npm install
npm start     # http://localhost:3000 — note this collides with sam local start-api above
```

The API base URL the website talks to is configured in `website/src/constants`/`utils` —
point it at your local SAM API or the deployed API Gateway URL as needed.

## Deploying

Both `deploy.sh` scripts assume the original author's AWS account, region, and resource
names; update them before deploying to a different account.

```bash
cd apis && ./deploy.sh      # packages and deploys the "practice-my-kid" CloudFormation stack (us-west-2)
cd website && ./deploy.sh   # builds the SPA and syncs it to s3://my-kids-practice
```

Things to check or update first:

- `apis/template.yaml` hard-codes an execution role ARN
  (`arn:aws:iam::334612759319:role/practice-my-kid`) — it must already exist in the target
  account, or be replaced with a role SAM creates for you.
- `apis/deploy.sh` hard-codes an S3 bucket for build artifacts (`harish-deploy-artifacts`)
  and deploy region (`us-west-2`).
- `website/deploy.sh` hard-codes an AWS profile name (`AWS_PRFILE`, note the typo — it
  won't actually select a profile as written) and target bucket (`my-kids-practice`).

## Known rough edges

- `apis/template.yaml` targets the `python3.6` Lambda runtime, which AWS has deprecated;
  new deployments should move this to a current supported runtime.
- `apis/practice-my-kid/tests/unit/test_handler.py` is effectively a placeholder — there's
  little real test coverage of the request handlers.
