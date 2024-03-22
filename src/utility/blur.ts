/**
 * Blurs the active element after running the given function.
 * @param fn - The function to run before blurring the active element.
 * @returns - A function that blurs the active element after running the given function.
 */
const blurWrapper = (fn: (...args: any[]) => any) => {
  return (...fnArgs: any[]) => {
    fn(...fnArgs);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
};

export default blurWrapper;
