export const entryTypes = (entries) => entries?.reduce((groupCount, entry) => {
  const newGroupCount = { ...groupCount };
  if (newGroupCount[entry.code]) {
    newGroupCount[entry.code].quantity += entry.quantity;
    newGroupCount[entry.code].cost += entry.totalCost;
  } else {
    newGroupCount[entry.code] = {
      name: entry.name,
      code: entry.code,
      quantity: entry.quantity,
      cost: entry.totalCost
    };
  }
  return newGroupCount;
}, {});

export const abc = () => {};
