const models = require('./server/models');
const section = models.section;
const entry = models.entry;

section.create({
  name: "Crypto",
  shortHand: 'CPT',
  description: 'Crypto currency ledger'
})
  .then((newSection) => {
    // The get() function allows you to recover only the DataValues of the object
    console.log(newSection.get())
    entry.create({
      name: "ETH",
      quantity: 1,
      transactionId: "CPT-ASD123DA2K",
      totalCost: 150000,
      sectionShortHand: "CPT"
    })
      .then((newEntry) => {
        // The get() function allows you to recover only the DataValues of the object
        console.log(newEntry.get())
      })
      .catch((err) => {
        console.log("Error while company creation : ", err)
      })
  })
  .catch((err) => {
    console.log("Error while company creation : ", err)
  })