// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {source_resource_template, source_metadatafieldregistry, target_resource_template, target_metadatafieldregistry} = require('./model/model')
const override = require('./config/config').override

var html = '';
var errHtml = '';
var runHtml = '';

function el(selector) {
    return document.getElementById(selector);
}

el('clear').addEventListener('click', function () {
    html = '';
    errHtml = '';
    runHtml = '';
    document.querySelector('#table > tbody').innerHTML = html;
    document.querySelector('#err > tbody').innerHTML = errHtml;
    document.querySelector('#run > tbody').innerHTML = runHtml;
});

el('exec').addEventListener('click', function () {

    getFirstTenRows(function (object) {
        target_resource_template.findAll({
            where: {
                fieldname: object.resource.fieldname,
                fieldtype: object.resource.fieldtype,
                resource_type_id: object.resource.resource_type_id,
                contenttype_id: object.resource.contenttype_id,
                showpage: object.resource.showpage,
                fieldorder: object.resource.fieldorder,
                required: object.resource.required
            }
        }).then(function (rows) {
            if (rows.length === 0) {
                target_metadatafieldregistry.findAll({
                    where: {
                        metadata_schema_id: object.metadata.metadata_schema_id,
                        element: object.metadata.element,
                        qualifier: object.metadata.qualifier,
                        fieldname_zh: object.metadata.fieldname_zh
                    }
                }).then(function (rows) {
                    if (rows.length === 0) {
                        delete object.metadata.metadata_field_id
                        target_metadatafieldregistry.create(object.metadata).then(function (rows) {
                            object.resource.metadata_field_id = rows.metadata_field_id
                            delete object.resource.template_id
                            target_resource_template.create(object.resource).then(function (rows) {
                                html += "成功添加！------- resource_template:" + rows.template_id + "; metadatafieldregistry:" + object.resource.metadata_field_id + "<br>";
                                document.querySelector('#table > tbody').innerHTML = html;
                            }).catch(function (err) {
                                errHtml += "失败添加！------- resource_template:" + object.resource.template_id + "---------" + err + "<br>";
                                document.querySelector('#err > tbody').innerHTML = errHtml;
                            })
                        }).catch(function (err) {
                            target_metadatafieldregistry.findAll({
                                where: {
                                    metadata_schema_id: object.metadata.metadata_schema_id,
                                    element: object.metadata.element,
                                    qualifier: object.metadata.qualifier,
                                    fieldname_zh: object.metadata.fieldname_zh
                                }
                            }).then(function (rows) {
                                if (rows.length > 0) {
                                    object.resource.metadata_field_id = rows[0].metadata_field_id
                                    delete object.resource.template_id
                                    target_resource_template.create(object.resource).then(function (rows) {
                                        html += "成功添加！------- resource_template:" + rows.template_id + "; metadatafieldregistry:" + object.resource.metadata_field_id + "<br>";
                                        document.querySelector('#table > tbody').innerHTML = html;
                                    }).catch(function (err) {
                                        errHtml += "失败添加！------- resource_template:" + object.resource.template_id + "---------" + err + "<br>";
                                        document.querySelector('#err > tbody').innerHTML = errHtml;
                                    })
                                } else {
                                    if (override) {
                                        target_metadatafieldregistry.findAll({
                                            where: {
                                                metadata_schema_id: object.metadata.metadata_schema_id,
                                                element: object.metadata.element,
                                                qualifier: object.metadata.qualifier
                                            }
                                        }).then(function (rows) {
                                            if (rows.length === 1) {
                                                target_metadatafieldregistry.update(object.metadata, {where: {metadata_field_id: rows[0].metadata_field_id}}).then(result => {
                                                    object.resource.metadata_field_id = rows[0].metadata_field_id
                                                    delete object.resource.template_id
                                                    target_resource_template.create(object.resource).then(function (rows) {
                                                        html += "成功添加！------- resource_template:" + rows.template_id + "; metadatafieldregistry:" + object.resource.metadata_field_id + "<br>";
                                                        document.querySelector('#table > tbody').innerHTML = html;
                                                    }).catch(function (err) {
                                                        errHtml += "失败添加！------- resource_template:" + object.resource.template_id + "---------" + err + "<br>";
                                                        document.querySelector('#err > tbody').innerHTML = errHtml;
                                                    })
                                                }).catch(function (err) {
                                                    errHtml += "失败添加！------- metadatafieldregistry:" + object.resource.metadata_field_id + "---------" + err + "<br>";
                                                    document.querySelector('#err > tbody').innerHTML = errHtml;
                                                })
                                            } else {
                                                target_metadatafieldregistry.findAll({
                                                    where: {
                                                        metadata_schema_id: object.metadata.metadata_schema_id,
                                                        fieldname_zh: object.metadata.fieldname_zh
                                                    }
                                                }).then(function (rows) {
                                                    if (rows.length === 1) {
                                                        target_metadatafieldregistry.update(object.metadata, {where: {metadata_field_id: rows[0].metadata_field_id}}).then(function () {
                                                            object.resource.metadata_field_id = rows[0].metadata_field_id
                                                            delete object.resource.template_id
                                                            target_resource_template.create(object.resource).then(function (rows) {
                                                                html += "成功添加！------- resource_template:" + rows.template_id + "; metadatafieldregistry:" + object.resource.metadata_field_id + "<br>";
                                                                document.querySelector('#table > tbody').innerHTML = html;
                                                            }).catch(function (err) {
                                                                errHtml += "失败添加！------- resource_template:" + object.resource.template_id + "---------" + err + "<br>";
                                                                document.querySelector('#err > tbody').innerHTML = errHtml;
                                                            })
                                                        }).catch(function (err) {
                                                            errHtml += "失败添加！------- metadatafieldregistry:" + object.resource.metadata_field_id + "---------" + err + "<br>";
                                                            document.querySelector('#err > tbody').innerHTML = errHtml;
                                                        })
                                                    } else {
                                                        errHtml += "失败添加！------- metadatafieldregistry:" + object.resource.metadata_field_id + "---------" + err + "<br>";
                                                        document.querySelector('#err > tbody').innerHTML = errHtml;
                                                    }
                                                }).catch(function (err) {
                                                    errHtml += err + "<br>";
                                                    document.querySelector('#err > tbody').innerHTML = errHtml;
                                                })
                                            }
                                        }).catch(function (err) {
                                            errHtml += err + "<br>";
                                            document.querySelector('#err > tbody').innerHTML = errHtml;
                                        })
                                    } else {
                                        errHtml += "失败添加！------- metadatafieldregistry:" + object.resource.metadata_field_id + "---------" + err + "<br>";
                                        document.querySelector('#err > tbody').innerHTML = errHtml;
                                    }
                                }
                            }).catch(function (err) {
                                errHtml += err + "<br>";
                                document.querySelector('#err > tbody').innerHTML = errHtml;
                            })
                        })
                    } else {
                        object.resource.metadata_field_id = rows[0].metadata_field_id
                        delete object.resource.template_id
                        target_resource_template.create(object.resource).then(function (rows) {
                            html += "成功添加！------- resource_template:" + rows.template_id + "; metadatafieldregistry:" + object.resource.metadata_field_id + "<br>";
                            document.querySelector('#table > tbody').innerHTML = html;
                        }).catch(function (err) {
                            errHtml += "失败添加！------- resource_template:" + object.resource.template_id + "---------" + err + "<br>";
                            document.querySelector('#err > tbody').innerHTML = errHtml;
                        })
                    }
                }).catch(function (err) {
                    errHtml += err + "<br>";
                    document.querySelector('#err > tbody').innerHTML = errHtml;
                })
            } else {
                runHtml += "正在执行!!!<br>";
                document.querySelector('#run > tbody').innerHTML = runHtml;
            }
        }).catch(function (err) {
            errHtml += err + "<br>";
            document.querySelector('#err > tbody').innerHTML = errHtml;
        })
    });

}, false);

function getFirstTenRows(callback) {

    //查询resource_template的全部数据
    source_resource_template.findAll().then(function (resource_templateArr) {
        resource_templateArr.forEach(item => {
            var object = new Object();
            //查找每条与resource_template对应的source_metadatafieldregistry数据
            source_metadatafieldregistry.findAll({
                where: {
                    metadata_field_id: item.dataValues.metadata_field_id
                }
            }).then(function (metadatafieldregistryArr) {
                if (metadatafieldregistryArr.length > 0) {
                    object.resource = item.dataValues;
                    object.metadata = metadatafieldregistryArr[0].dataValues;
                    callback(object);
                }
            }).catch(function (err) {
                errHtml += err + "<br>";
                document.querySelector('#err > tbody').innerHTML = errHtml;
            })
        })
    }).catch(function (err) {
        errHtml += err + "<br>";
        document.querySelector('#err > tbody').innerHTML = errHtml;
    });
}