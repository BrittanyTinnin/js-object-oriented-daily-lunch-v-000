// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name;

    //insert neighborhood in store
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id 
      }.bind(this)
      // (delivery) => {
      //   return delivery.neighborhoodId === this.id
      //   // console.log(delivery);
      // }
    )
  }

  customers() {
    return store.customers.filter(
      (customer) => {return customer.neighborhoodId === this.id}
    );
  }

  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}

let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId
    

    //adds customer to store
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      (delivery) => {return delivery.customerId === this.id}
    );
  }

  meals() {
    return this.deliveries().map(
      (delivery) => {return delivery.meal()}
    );
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => {return total += meal.price}, 0);
  }

}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    //adds meal to store
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      (delivery) => {return delivery.mealId === this.id}
    );
  }

  customers() {
    return this.deliveries().map(
      (delivery) => {return delivery.customer()}
    )
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;

    //add delivery to store
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      (meal) => {return meal.id === this.mealId}
    );
  }

  customer() {
    return store.customers.find(
      (customer) => {return customer.id === this.customerId}
    );
  }

  neighborhood() {
    return store.neighborhoods.find(
      (neighborhood) => {return neighborhood.id === this.neighborhoodId}
    );
  }

}