export function checkRole(loginUser, roleName) {
  console.log(loginUser, roleName);
  return loginUser.role === roleName;
}
export function convertToInches(value, unit) {
  const mmToInches = 0.0393701;
  const cmToInches = 0.393701;

  if (unit === 'mm') {
    return value * mmToInches;
  } else if (unit === 'cm') {
    return value * cmToInches;
  } else {
    return value;
  }
}
export function checkFitInCase(motherboardDimensions, caseInfo) {
  const motherboardLength = motherboardDimensions[0];
  const motherboardWidth = motherboardDimensions[1];

  const gpuLengthLimit = caseInfo.gpuLengthLimit;

  const fitsInLength = motherboardLength <= gpuLengthLimit;
  const fitsInWidth = motherboardWidth <= caseInfo.caseWidth;

  return fitsInLength && fitsInWidth;
}
export function extractNumberFromString(str) {
  const matches = str.match(/\d+(\.\d+)?/);
  return matches ? parseFloat(matches[0]) : null;
}
export function extractNumberFromCpuCoolerSupportSize(cpuCoolerSupportSize) {
  const matches = cpuCoolerSupportSize.split('/')[1].match(/\d+(\.\d+)?/);
  return matches ? parseFloat(matches[0] + 'mm') : null;
}
