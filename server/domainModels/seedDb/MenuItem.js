var MenuItem = require('mongoose').model('MenuItem');
var Q = require('q');

module.exports = createDefaultMenuItems;

function createDefaultMenuItems(companyId) {
    var dfd = Q.defer();

    var items = [];
    MenuItem.find({}).exec(function (err, collection) {
        if (err) {
            console.log(err.toString());
        }
        if (collection.length === 0) {
            var menuItem1 = {
                meta: { company: companyId },
                name: 'Mexican Fiesta',
                description: `Southwest Caesar Salad, Pork Tenderloin with Tomatillo Sauce, Chicken Enchiladas, Spanish Rice, Tortilla Chips, Salsa, Homemade Guacamole, Flan Cups`,
                title: 'Mexican Fiesta',
                subtitle: 'Mexican Fiesta',
                notes: '',
                category: 'Buffet',
                linkeditems: []
            };
            var menuItem2 = { 
                meta: { company: companyId }, 
                name: 'Italian Buffet', 
                description: `Panzanella Salad, Grilled Vegetable Lasagna, Penne Bolognese, Grilled Squash and Eggplant, Garlic Cheese Toast, Tiramisu Cups`, 
                title: 'Italian Buffet', 
                subtitle: 'Italian Buffet', 
                notes: '', 
                category: 'Buffet', 
                linkeditems: [] };
            var menuItem3 = { 
                meta: { company: companyId }, 
                name: 'Taste of Thai', 
                description: `Green Salad with Chili Lime Dressing, Thai Chicken Pasta, Thai Beef, Red Curry Rissotto, Spring Rolls, Thai Creme Caramel`, 
                title: 'Taste of Thai', 
                subtitle: 'Taste of Thai', 
                notes: '', 
                category: 'Buffet', 
                linkeditems: [] };
            var menuItem4 = { 
                meta: { company: companyId }, 
                name: 'French Elegance', 
                description: `Mixed Greens with French Dressing, Beef Bourguignon, Chicken Cordon Bleu, Potatoes au Gratin, Ratatouille, Strawberry Crepes`, 
                title: 'French Elegance', 
                subtitle: 'French Elegance', 
                notes: '', 
                category: 'Buffet', 
                linkeditems: [] };

            MenuItem.create(menuItem1, 
                menuItem2, 
                menuItem3, 
                menuItem4, function (err, 
                item1, 
                item2, 
                item3, 
                item4) {
                if (err) {
                    console.log(err.toString());
                }
                items.push(item1);
                items.push(item2);
                console.log('30 succesfully created menuitem documents.....');

                dfd.resolve(items);

            });



        }

    });

    return dfd.promise;

}

