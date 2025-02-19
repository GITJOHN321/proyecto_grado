function filterAtribute(list,atribute) {
  return list.filter(
    (object) => object.neighborhood.toLowerCase() === atribute.toLowerCase()
  );
}
export default filterAtribute;
