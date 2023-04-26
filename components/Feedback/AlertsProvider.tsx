"use client";

import { alertStore } from "@/stores/useAlert.store";
import SnackBar from "./Snackbar";
import { match, P } from "ts-pattern";

type StatusType = "info" | "success" | "error" | "warning";

const AlertsProvider = () => {
  const alerts = alertStore((state) => state.alerts);

  const getStatus = (status: number) => {
    return match(status)
      .with(
        P.when((status) => status >= 100 && status <= 199),
        () => "info"
      )
      .with(
        P.when((status) => status >= 200 && status <= 299),
        () => "success"
      )
      .with(
        P.when((status) => status >= 400 && status <= 499),
        () => "error"
      )
      .with(
        P.when((status) => status >= 500 && status <= 599),
        () => "warning"
      )
      .otherwise(() => "info") as StatusType;
  };

  return (
    <>
      {match(alerts.length > 0)
        .with(true, () => (
          <div className='fixed bottom-0 right-0 w-full h-max flex-col items-center justify-center space-y-4'>
            {alerts.map((alert, index) => (
              <SnackBar
                key={`${alert.message}-${index}`}
                status={getStatus(alert.status)}
                errorList={alert.errorList}
                message={alert.message}
              />
            ))}
          </div>
        ))
        .otherwise(() => null)}
    </>
  );
};

export default AlertsProvider;
