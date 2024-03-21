import { ExtendedOpenloginUserInfo, SupabaseUser } from "@/types";
import { makeVar } from "@apollo/client";

export const visibleSignInVar = makeVar<boolean>(false);

export const visibleHeaderVar = makeVar<boolean>(true);

export const openWeb3ModalVar = makeVar<boolean>(false);

export const openIntroModalVar = makeVar<boolean>(false);

export const setUserId = makeVar<string>("");

export const setLoggedIn = makeVar<boolean>(false);

export const setAddress = makeVar<string>("");

export const setUserInfo = makeVar<ExtendedOpenloginUserInfo | null>(null);

export const setUserSupabase = makeVar<SupabaseUser | null>(null);

export const setInviteCode = makeVar<string>("dao999nft");

export const setInviterUserId = makeVar<string>("");

export const setBalance = makeVar<string | null>(null);
