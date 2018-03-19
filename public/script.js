var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    quantity: 1,
    drag: {},
  },
  created: function() {
    this.getItems();
  },
  methods: {
    getItems: function () {
      axios.get("/api/items").then(response => {
        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },
    addItem: function() {
      axios.post("/api/items", {
        text: this.text,
        quantity: this.quantity,
      }).then(response => {
        this.text = "";
        this.quantity = 1,
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    incQuantity: function(item) {
      if (item.quantity < 4) {
        axios.put("/api/items/" + item.id, {
          text: item.text,
          quantity: item.quantity++,
          orderChange: false,
        }).then(response => {
          return true;
        }).catch(err => {
        });
      }
    },
    decQuantity: function(item) {
      if (item.quantity > 1) {
        axios.put("/api/items/" + item.id, {
          text: item.text,
          quantity: item.quantity--,
          orderChange: false,
        }).then(response => {
          return true;
        }).catch(err => {
        });
      }
    },
    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      axios.put("/api/items/" + this.drag.id, {
        text: this.drag.text,
        quantity: this.drag.quantity,
        orderChange: true,
        orderTarget: item.id
      }).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
  }
});
