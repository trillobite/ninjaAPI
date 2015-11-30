var MenuGroup = require('mongoose').model('MenuGroup');

module.exports = createDefaultMenuGroup;


function createDefaultMenuGroup(companyId, menu) {
    
    var newMenuGroup = new MenuGroup({
        
        meta: {company: companyId},
        title: "new menu group",
        subtitle: "new menu group subtitle",
        menus: [ {
            menuId: menu._id,
            title: menu.title,
            subtitle: menu.subtitle
            }
            
        ]
    });
    console.log('50 successfully created menu groups document....');
    return newMenuGroup.save();
    
}