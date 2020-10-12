const {Sequelize, Model} = require('sequelize')
const {sourceSequelize} = require('../config/sourceDB')
const {targetSequelize} = require('../config/targetDB')

class source_resource_template extends Model {
}

source_resource_template.init({
    template_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    metadata_field_id: Sequelize.INTEGER,
    filedResourceName: Sequelize.STRING(32),
    fieldname: Sequelize.STRING(64),
    fieldname_zh: Sequelize.STRING(64),
    fieldname_en: Sequelize.STRING(64),
    fieldname_tw: Sequelize.STRING(64),
    fieldtype: Sequelize.INTEGER,
    fieldlength: Sequelize.INTEGER,
    resource_type_id: Sequelize.INTEGER,
    contenttype_id: Sequelize.INTEGER,
    showpage: Sequelize.INTEGER,
    fieldorder: Sequelize.INTEGER,
    required: Sequelize.INTEGER,
    default_value: Sequelize.STRING(1024),
    default_value_en: Sequelize.STRING(1024),
    repeatable: Sequelize.INTEGER,
    language: Sequelize.STRING(64),
    internal: Sequelize.INTEGER,
    isHidden: Sequelize.INTEGER,
    isExport: Sequelize.INTEGER,
    placeholder: Sequelize.STRING(300),
    cls: Sequelize.STRING(300),
    suffix: Sequelize.STRING(100),
    validator: Sequelize.TEXT,
    idName: Sequelize.STRING(50),
    baseinfoFilter: Sequelize.STRING(11),
    isReadonly: Sequelize.INTEGER,
    isDisplayOnFrontPage: Sequelize.INTEGER,
    frontPageOrder: Sequelize.INTEGER,
    can_delete: Sequelize.INTEGER,
    displayStateStr: Sequelize.STRING(100),
    subjecttype: Sequelize.STRING(11),
    fieldnote: Sequelize.TEXT,
    fieldnote_zh: Sequelize.TEXT,
    fieldnote_en: Sequelize.TEXT,
    fieldnote_tw: Sequelize.TEXT,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
    // moduleId: Sequelize.INTEGER,
    // automatchFlag: Sequelize.INTEGER,
}, {
    sequelize: sourceSequelize,
    modelName: 'resource_template'
})

class source_metadatafieldregistry extends Model {
}

source_metadatafieldregistry.init({
    metadata_field_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    metadata_schema_id: Sequelize.INTEGER,
    element: Sequelize.STRING(64),
    qualifier: Sequelize.STRING(64),
    scope_note: Sequelize.TEXT,
    fieldname: Sequelize.STRING(64),
    fieldname_zh: Sequelize.STRING(64),
    fieldname_en: Sequelize.STRING(150),
    fieldname_tw: Sequelize.STRING(64),
    fieldtype: Sequelize.INTEGER,
    datatype: Sequelize.INTEGER,
    repeatable: Sequelize.INTEGER,
    internal: Sequelize.INTEGER,
    valid: Sequelize.INTEGER,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
}, {
    sequelize: sourceSequelize,
    modelName: 'metadatafieldregistry'
})

class target_resource_template extends Model {
}

target_resource_template.init({
    template_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    metadata_field_id: Sequelize.INTEGER,
    filedResourceName: Sequelize.STRING(32),
    fieldname: Sequelize.STRING(64),
    fieldname_zh: Sequelize.STRING(64),
    fieldname_en: Sequelize.STRING(64),
    fieldname_tw: Sequelize.STRING(64),
    fieldtype: Sequelize.INTEGER,
    fieldlength: Sequelize.INTEGER,
    resource_type_id: Sequelize.INTEGER,
    contenttype_id: Sequelize.INTEGER,
    showpage: Sequelize.INTEGER,
    fieldorder: Sequelize.INTEGER,
    required: Sequelize.INTEGER,
    default_value: Sequelize.STRING(1024),
    default_value_en: Sequelize.STRING(1024),
    repeatable: Sequelize.INTEGER,
    language: Sequelize.STRING(64),
    internal: Sequelize.INTEGER,
    isHidden: Sequelize.INTEGER,
    isExport: Sequelize.INTEGER,
    placeholder: Sequelize.STRING(300),
    cls: Sequelize.STRING(300),
    suffix: Sequelize.STRING(100),
    validator: Sequelize.TEXT,
    idName: Sequelize.STRING(50),
    baseinfoFilter: Sequelize.STRING(11),
    isReadonly: Sequelize.INTEGER,
    isDisplayOnFrontPage: Sequelize.INTEGER,
    frontPageOrder: Sequelize.INTEGER,
    can_delete: Sequelize.INTEGER,
    displayStateStr: Sequelize.STRING(100),
    subjecttype: Sequelize.STRING(11),
    fieldnote: Sequelize.TEXT,
    fieldnote_zh: Sequelize.TEXT,
    fieldnote_en: Sequelize.TEXT,
    fieldnote_tw: Sequelize.TEXT,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
    // moduleId: Sequelize.INTEGER,
    // automatchFlag: Sequelize.INTEGER
}, {
    sequelize: targetSequelize,
    modelName: 'resource_template'
})

class target_metadatafieldregistry extends Model {
}

target_metadatafieldregistry.init({
    metadata_field_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    metadata_schema_id: Sequelize.INTEGER,
    element: Sequelize.STRING(64),
    qualifier: Sequelize.STRING(64),
    scope_note: Sequelize.TEXT,
    fieldname: Sequelize.STRING(64),
    fieldname_zh: Sequelize.STRING(64),
    fieldname_en: Sequelize.STRING(150),
    fieldname_tw: Sequelize.STRING(64),
    fieldtype: Sequelize.INTEGER,
    datatype: Sequelize.INTEGER,
    repeatable: Sequelize.INTEGER,
    internal: Sequelize.INTEGER,
    valid: Sequelize.INTEGER,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
}, {
    sequelize: targetSequelize,
    modelName: 'metadatafieldregistry'
})

module.exports = {
    source_resource_template, source_metadatafieldregistry, target_resource_template, target_metadatafieldregistry
}

