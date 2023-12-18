import { format } from "date-fns";
import divide from '/mult/divide/index.mjs';
export default function getPercentage(value, total) {
    console.log(format(new Date(), "yyyy-MM-dd HH:mm:ss") +
        " - getPercentage.ts - getPercentage");
    return divide(value, total) * 100;
}
