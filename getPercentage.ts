import { format } from "date-fns";
import divide from "./mult/divide";

export default function getPercentage(value: number, total: number): number {
  console.log(
    format(new Date(), "yyyy-MM-dd HH:mm:ss") +
      " - getPercentage.ts - getPercentage"
  );
  return divide(value, total) * 100;
}
