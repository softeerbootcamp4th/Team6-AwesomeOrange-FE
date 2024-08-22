export const PHONE_INITIAL_X = 150;
export const PHONE_INITIAL_Y = 100;
export const STEP = 25;

export function canSnapPhoneInKeyboardMode({islandY, phoneX, phoneY})
{
	return Math.hypot(islandY - phoneY, phoneX) < 75;
}