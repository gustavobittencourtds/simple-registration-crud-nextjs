
import firebase from "../config";
import Customer from "../../core/Customer";
import CustomerRepository from "../../core/CustomerRepository";

export default class CustomerCollection implements CustomerRepository{

  #conversor = {
    toFirestore(customer: Customer) {
      return {
        name: customer.name,
        age: customer.age
      }
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Customer {
      const data = snapshot?.data(options)

      return new Customer(data.name, data.age, snapshot?.id)
    }
  }

  async save(customer: Customer): Promise<Customer | undefined> {
      if(customer?.id) {
        await this.collection().doc(customer.id).set(customer)
        return customer
      }else {
        const docRef = await this.collection().add(customer)
        const doc = await docRef.get()
        return doc.data()
      }
  }

  async delete(customer: Customer): Promise<void> {
    return this.collection().doc(customer.id).delete();
  }

  async listAll(): Promise<Customer[]> {
    const query = await this.collection().get()
    return query.docs.map(doc => doc.data()) ?? []
  }

  private collection() {
    return firebase
    .firestore().collection('customers')
    .withConverter(this.#conversor)
  }
}