export const GetLocalTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Adjust month to 1-based index
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const GetNumericalDate = (getHours?: boolean): number => {
  const timeNow = new Date();
  const bangkokStringTime = timeNow.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const bangkokTime = new Date(bangkokStringTime);

  const bangkokMidnight = new Date(
    bangkokTime.getFullYear(),
    bangkokTime.getMonth(),
    bangkokTime.getDate(),
    getHours ? bangkokTime.getHours() : 0,
    // bangkokTime.getHours(),
  );

  return Math.floor(bangkokMidnight.getTime());
};

export const FormatTime = (date: string): string => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok", // Specify the Bangkok timezone
  };

  const parts = new Intl.DateTimeFormat("en-US", options).format(dateObject);

  const [month, day, year] = parts.replaceAll(",", "").split(" ");

  return `${day} ${month} ${year}`;
};

export const ConvertBangkokTime = (
  dateString: string,
  time: string,
): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hoursPart, minutePart] = time.split(":").map(Number);

  const bkkNowDate = new Date(year, month - 1, day, hoursPart, minutePart);

  return bkkNowDate.getTime();
};

export const DateStringToInteger = (dateString: string): number => {
  const date = new Date(dateString);
  const bangkokStringTime = date.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const bangkokTime = new Date(bangkokStringTime);

  const bangkokMidnight = new Date(
    bangkokTime.getFullYear(),
    bangkokTime.getMonth(),
    bangkokTime.getDate(),
  );

  return bangkokMidnight.getTime();
};

const getBangkokTime = (): string => {
  const bangkokTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  return bangkokTime;
};

export const GetBangkokHour = (): number => {
  const timeNow = new Date();
  const bangkokStringTime = timeNow.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  
  return new Date(bangkokStringTime).getHours();
};

export const IsTimeHourGreater = (time1: string, time2: string): boolean => {

  const separator1 = time1.includes(":") ? ":" : ".";
  const separator2 = time2.includes(":") ? ":" : ".";

  const [t1Hours, t1Minutes] = time1.split(separator1).map(Number);
  const [t2Hours, t2Minutes] = time2.split(separator2).map(Number);

  if (t1Hours > t2Hours) return true;
  if (t1Hours < t2Hours) return false;
  
  return t1Minutes > t2Minutes;
};

export const IsRoundPassed = (fullDateTime: string): boolean => {
  // สมมติว่ารูปแบบคือ YYYY-MM-DD:HH:mm หรือ YYYY-MM-DD:HH.mm
  // เช่น "2026-02-25:10:30"
  let cleanFormat = fullDateTime;
  
  // ถ้ามีเวลาตามหลังแบบมีโคลอนเชื่อมกับวันที่ (เผื่อกรณีฟอร์แมตแปลกๆ) ให้แทนที่ด้วย T เพื่อให้ parse ผ่าน
  // ปกติควรเป็น YYYY-MM-DDTHH:mm
  if (fullDateTime.split(":").length === 3) { // 2026-02-25:10:30
    const parts = fullDateTime.split(":");
    cleanFormat = `${parts[0]}T${parts[1]}:${parts[2]}`;
  } else if (fullDateTime.includes("T")) {
    cleanFormat = fullDateTime;
  } else {
    // ถ้าใช้แบบเว้นวรรค 2026-02-25 10:30 หรือ . 2026-02-25 10.30
    cleanFormat = fullDateTime.replace(/ /g, "T").replace(/\./g, ":");
  }

  // วันเวลาจากรอบนั้น (ถ้าแปลงเป็น Date แล้ว valid)
  const roundDate = new Date(cleanFormat);
  
  // วันเวลาปัจจุบัน (Bangkok)
  const timeNow = new Date();
  const bangkokStringTime = timeNow.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
  const bkkNow = new Date(bangkokStringTime);
  
  // ปรับเวลาปัจจุบันให้เหลือแค่ระดับชั่วโมง (นาที, วินาที, มิลลิวินาทีเป็น 0)
  // จะได้เปรียบเทียบในระดับ "ชั่วโมง" ตามความต้องการ
  bkkNow.setMinutes(0, 0, 0);

  // ถ้ารอบฉาย น้อยกว่า เวลาปัจจุบัน (ที่นับแค่ชั่วโมง) = รอบนั้นผ่านไปแล้ว (true)
  return roundDate.getTime() <= bkkNow.getTime();
};