import { logout } from "@/services/auth.service";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import LogoutIcon from "@/public/logout.svg";
import LoadingIcon from "@/public/loading.svg";
import { match } from "ts-pattern";
import { alertStore } from "@/stores/useAlert.store";

export const LogoutItem = () => {
  const { trigger: triggerLogout, isMutating } = useSWRMutation(
    "/auth/logout",
    logout
  );
  const addAlert = alertStore((state) => state.addAlert);

  const handleLogout = () => {
    triggerLogout()
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        addAlert({
          message: error.message,
          errorList: error.errorList,
          status: error.statusCode,
        });
        window.location.reload();
      });
  };
  return (
    <li
      className='flex gap-x-2 px-4 py-2 text-sm hover:bg-violet-500 cursor-pointer hover:text-white'
      onClick={match(isMutating)
        .with(false, () => handleLogout)
        .otherwise(() => () => {})}>
      {match(isMutating)
        .with(true, () => (
          <>
            <Image src={LoadingIcon} alt='Logout icon' width={20} height={20} />
            Logging out...
          </>
        ))
        .otherwise(() => (
          <>
            <Image
              src={LogoutIcon}
              alt='Logout icon'
              width={20}
              height={20}
              className='dark:invert'
            />
            Logout
          </>
        ))}
    </li>
  );
};
