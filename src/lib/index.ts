export const removeExtension = (fileName: string): string => {
   const nameArray = fileName.split('.');
   nameArray.pop();
   return nameArray.join('.');
}

export const secondToMinute = (time: number): string => {
   const minute = Math.floor(time / 60);
   const second = Math.floor(time % 60);
   const fixedTime = `${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
   const isNan = '00:00';
   return isNaN(minute) || isNaN(second) ? isNan : fixedTime;
}