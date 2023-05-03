import { logout } from "@/services/auth.service";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { alertStore } from "@/stores/useAlert.store";
import { Loading, Logout } from "@/public/icons";

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
            <Loading className='w-5 h-5 stroke-text' />
            Logging out...
          </>
        ))
        .otherwise(() => (
          <>
            <Logout className='w-5 h-5' />
            Logout
          </>
        ))}
    </li>
  );
};
