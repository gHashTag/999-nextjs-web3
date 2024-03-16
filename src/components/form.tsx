/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useCallback } from "react";
import cn from "classnames";

import { useRouter } from "next/router";

import LoadingDots from "./loading-dots";
import styleUtils from "./utils.module.css";
import styles from "./form.module.css";
import useEmailQueryParam from "@lib/hooks/use-email-query-param";

import Captcha, { useCaptcha } from "./captcha";

import { checkUsername } from "@/hooks/useWeb3Auth";

type FormState = "default" | "loading" | "error";

type Props = {
  sharePage?: boolean;
};

export default function Form({ sharePage }: Props) {
  const [inviteCode, setInviteCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorTryAgain, setErrorTryAgain] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>("default");
  const router = useRouter();
  const {
    ref: captchaRef,
    execute: executeCaptcha,
    reset: resetCaptcha,
    isEnabled: isCaptchaEnabled,
  } = useCaptcha();

  const handleRegister = useCallback(async () => {
    if (inviteCode) {
      const userId = await checkUsername(inviteCode);

      if (userId) {
        router.push({
          pathname: "/wallet",
          query: { inviteCode: inviteCode },
        });
      } else {
        setErrorMsg("Invite code not correct");
        setFormState("error");
        setTimeout(() => setFormState("default"), 3000);
        return;
      }
    }
  }, [inviteCode]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (formState === "default") {
        setFormState("loading");

        if (isCaptchaEnabled) {
          return executeCaptcha();
        }

        return handleRegister();
      } else {
        setFormState("default");
      }
    },
    [executeCaptcha, formState, isCaptchaEnabled, handleRegister]
  );

  const onTryAgainClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setFormState("default");
      setErrorTryAgain(true);
      resetCaptcha();
    },
    [resetCaptcha]
  );

  useEmailQueryParam("inviteCode", setInviteCode);

  return formState === "error" ? (
    <div
      className={cn(styles.form, {
        [styles["share-page"]]: sharePage,
      })}
    >
      <div className={styles["form-row"]}>
        <div className={cn(styles["input-label"], styles.error)}>
          <div className={cn(styles.input, styles["input-text"])}>
            {errorMsg}
          </div>
          <button
            type="button"
            className={cn(styles.submit, styles.register, styles.error)}
            onClick={onTryAgainClick}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      className={cn(styles.form, {
        [styles["share-page"]]: sharePage,
        [styleUtils.appear]: !errorTryAgain,
        [styleUtils["appear-fifth"]]: !errorTryAgain && !sharePage,
        [styleUtils["appear-third"]]: !errorTryAgain && sharePage,
      })}
      onSubmit={onSubmit}
    >
      <div className={styles["form-row"]}>
        <label
          htmlFor="email-input-field"
          className={cn(styles["input-label"], {
            [styles.focused]: focused,
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="text"
            id="email-input-field"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter invite code to register"
            aria-label="Your invite code address"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles.register, styles[formState])}
          disabled={formState === "loading"}
        >
          {formState === "loading" ? (
            <LoadingDots size={4} />
          ) : (
            <p className={styles["register-text"]}>Register</p>
          )}
        </button>
      </div>
      <Captcha ref={captchaRef} onVerify={handleRegister} />
    </form>
  );
}
