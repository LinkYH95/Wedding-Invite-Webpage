import { useEffect, useMemo, useState } from "react";
import "./CountDownTimer.css";

type CountdownTimerProps = {
  targetDate: string | Date;
};

type TimeParts = {
  isPast: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeParts(targetDate: Date): TimeParts {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = target - now;
  const absoluteDiff = Math.abs(diff);

  const days = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absoluteDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absoluteDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((absoluteDiff / 1000) % 60);

  return {
    isPast: diff < 0,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function CountdownTimer({
  targetDate,
}: CountdownTimerProps) {
  const parsedTargetDate = useMemo(() => new Date(targetDate), [targetDate]);

  const [time, setTime] = useState<TimeParts>(() =>
    getTimeParts(parsedTargetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeParts(parsedTargetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedTargetDate]);

  return (
    <div>
      <p className="address-header">{time.isPast ? "Since our wedding day" : "Countdown to our wedding"}</p>
      <h2 className="countdown-number">
        {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
      </h2>
    </div>
  );
}