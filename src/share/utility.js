export const updateObject = (oldObject, updatedProprerties) => {
  return {
    ...oldObject,
    ...updatedProprerties,
  };
};
