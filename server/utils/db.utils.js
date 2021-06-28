import randomize from 'randomatic';

const CODE_LENGTH = 10;

export const isExists = (db, modelName, pk, id) => db[modelName].count({ where: { [pk]: id } })
    .then(count => {
        if (count != 0) {
            return true;
        }
        return false;
    });

export const generateUniqueTransactionId = async ({shortHand, models }) => {
    let isUnique = false;
    let id;
    while (!isUnique) {
        id = `${shortHand}-${randomize('A0', CODE_LENGTH)}`;
        isUnique = !(await isExists(models, 'entry', 'transactionId', id));
    }
    return id;
}