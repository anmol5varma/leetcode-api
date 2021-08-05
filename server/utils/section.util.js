export const entryTypes = (entries) => {
  const types = entries?.reduce((groupCount, entry) => {
    const newGroupCount = { ...groupCount };
    if (newGroupCount[entry.code]) {
      newGroupCount[entry.code].quantity += entry.quantity;
      if (entry.quantity > 0) {
        newGroupCount[entry.code].cost += entry.totalCost;
      } else {
        newGroupCount[entry.code].sold += Math.abs(entry.quantity);
        newGroupCount[entry.code].soldValue += Math.abs(entry.totalCost);
      }
    } else {
      newGroupCount[entry.code] = {
        name: entry.name,
        code: entry.code,
        quantity: entry.quantity,
        cost: entry.quantity > 0 ? entry.totalCost : 0,
        sold: entry.quantity > 0 ? 0 : Math.abs(entry.quantity),
        soldValue: entry.quantity > 0 ? 0 : Math.abs(entry.totalCost),
      };
    }
    return newGroupCount;
  }, {});

  Object.keys(types).forEach((key) => {
    types[key].cost -= types[key].sold * (
      types[key].cost / (types[key].quantity + types[key].sold)
    );
  });
  return types;
};

export const abc = () => { };
