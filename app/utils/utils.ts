import moment from "moment";
import "moment-duration-format";

export const getValidUserId = (id) => id.replace("%40", "@");

export const timeDuration = (time: string) => {
  const timeDiff = moment().diff(moment(time));
  const theDiffObject = {
    years: moment.duration(timeDiff).years(),
    months: moment.duration(timeDiff).months(),
    weeks: moment.duration(timeDiff).weeks(),
    days: moment.duration(timeDiff).days(),
  };

  if (theDiffObject.years > 0) {
    return `${theDiffObject.years} năm trước`;
  } else if (theDiffObject.months > 0) {
    return `${theDiffObject.months} tháng trước`;
  } else if (theDiffObject.weeks > 0) {
    return `${theDiffObject.weeks} tuần trước`;
  } else if (theDiffObject.days > 0) {
    return `${theDiffObject.days} ngày trước`;
  } else {
    return moment.duration(timeDiff).format("h [hrs], m [min]");
  }
};
