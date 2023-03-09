import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const data = useActionData();

  console.log(searchParams.get("mode"));
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <ul>
          {data &&
            data.errors &&
            Object.values(data.errors).map((err, i) => {
              return <li key={i}>{err}</li>;
            })}
        </ul>
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
