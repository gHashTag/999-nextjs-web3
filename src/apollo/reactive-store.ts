import { ExtendedOpenloginUserInfo, SupabaseUser } from "@/types";
import { makeVar } from "@apollo/client";

export const visibleSignInVar = makeVar(false);

export const openWeb3ModalVar = makeVar(false);

export const openIntroModalVar = makeVar(false);

export const userId = makeVar("");

export const setLoggedIn = makeVar(false);

export const setAddress = makeVar<string>("");

export const setUserInfo = makeVar<ExtendedOpenloginUserInfo | null>(null);

export const setUserSupabase = makeVar<SupabaseUser | null>(null);
