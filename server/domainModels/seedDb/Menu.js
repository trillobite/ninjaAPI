var Menu = require('mongoose').model('Menu');
var Q = require('q');

module.exports = createDefaultMenu;

function createDefaultMenu(companyId, items) {
    
    var newMenu = new Menu({
        meta: {company: companyId},
        name: "2016 Dinner Menu",
        description: "This is our new menu with a descpription",
        title: "Dinner Menu",
        subtitle: "Our menu is prepared daily from fresh ingredients.",
        sections: [{
            title: "Appetizers",
            subtitle: "Enjoy an assortment family style for larger parties!",
            
            items: [{menuItemId: items[0]._id,
                    name: items[0].name,
                    description: items[0].description
                },
                {menuItemId: items[1]._id,
                    name: items[1].name,
                    description: items[1].description
                    }
                ],
            footer: '* able to be served family style'
        }],
        footer: "Happy customers is our one and only goal!"

            }

        );
        
        

    console.log('40 successfully created menu document....');
    return newMenu.save();

}