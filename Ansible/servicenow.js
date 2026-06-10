//////This Replication yes end point run script
var request_number = current.request.number.toString();
var request_item_number = current.number.toString();
var requester = current.variables.requester.getDisplayValue().trim();
var approver = current.variables.approver.getDisplayValue().trim();
 
 
var Size_Unit = current.variables.size_unit.getValue();
var size_mb = current.variables.size_in_mb.getDisplayValue().trim();
var size_Gb = current.variables.size_in_gb.getDisplayValue().trim();
var size_Tb = current.variables.size_in_tb.getDisplayValue().trim();
 
if (Size_Unit === 'tb') {
  converted_output_str = size_Tb * 1024 * 1024; // 1 TB = 1024 GB = 1024 * 1024 MB
  converted_output = converted_output_str.toString();
} else if (Size_Unit === 'gb') {
  converted_output_str = size_Gb * 1024; // 1 GB = 1024 MB
  converted_output = converted_output_str.toString();
} else if (Size_Unit === 'mb') {
  converted_output = size_mb; // 1024 MB
}
 
 
 
// Get RITM Sys ID
var vset = current.sys_id;
 
//Fetch the BKC Details
var task = new GlideRecord('sc_task');
task.addQuery('request_item.sys_id', vset);
task.addQuery('short_description', 'Task for Storage team');
task.query();
 
if (task.next()) {
    var os_Type = task.variables.os_type.getDisplayValue().trim();
    var server_Hostname = task.variables.server_hostname.getDisplayValue().trim();
    var replication_requried = task.variables.replication_required.getValue();
    var request_Type = task.variables.request_type.getDisplayValue().trim();
    var export_Policy = task.variables.export_policy_new_existing.getValue();
 
    var storage_ip_bkc = task.variables.storage_ip_bkc.getDisplayValue().trim();
    var storage_ip_bcp = task.variables.storage_ip_bcp.getDisplayValue().trim();
 
    var storage_location_bkc = task.variables.storage_location_bkc.getDisplayValue().trim();
    var storage_location_bcp = task.variables.storage_location_bcp.getDisplayValue().trim();
   
    var svm_name_bkc = task.variables.svm_name.getDisplayValue().trim();
    var svm_name_bcp = task.variables.svm_name_bcp.getDisplayValue().trim();
 
    var export_policy_name_new_bkc = task.variables.export_policy_name_new.getDisplayValue().trim();
    var export_policy_name_new_bcp = task.variables.export_policy_name_new_bcp.getDisplayValue().trim();
 
    var export_policy_name_bkc = task.variables.export_policy_name.getDisplayValue().trim();
    var export_policy_name_bcp = task.variables.export_policy_name_bcp.getDisplayValue().trim();
 
    var aggregate_name_bkc = task.variables.aggregate_name.getDisplayValue().trim();
    var aggregate_name_bcp = task.variables.aggregate_name_bcp.getDisplayValue().trim();
 
   
    var snapshot_policy_name_bkc = task.variables.snapshot_policy_name.getValue();
    var snapshot_policy_name_bcp = task.variables.snapshot_policy_name_bcp.getValue();
 
    var share_name = task.variables.share_name.getDisplayValue().trim();
    var shareName_bkc = task.variables.share_name_bkc.getDisplayValue().trim();
    var shareName_bcp = task.variables.share_name_bcp.getDisplayValue().trim();
 
    var volume_name = task.variables.volume_name_bkc.getDisplayValue().trim();
    var volumeName_bcp = task.variables.volume_name_bcp.getDisplayValue().trim();
 
    var share_folder_name = task.variables.share_folder_name_bkc.getDisplayValue().trim();
    var share_folder_name_bcp = task.variables.share_folder_name_bcp.getDisplayValue().trim();
   
 
    var user_group_permission = task.variables.user_group_permission.getValue();
    var mount_path = task.variables.mount_path.getDisplayValue().trim();
    var policy_ro_rule = task.variables.policy_ro_rule.getDisplayValue().trim();
    var policy_rw_rule = task.variables.policy_rw_rule.getDisplayValue().trim();
    var policy_user_id = task.variables.policy_user_id.getDisplayValue().trim();
    var policy_superuser = task.variables.policy_superuser.getDisplayValue().trim();
    var access_permission = task.variables.access_permission.getValue();
 
    var quotaUnit = task.variables.quota_unit.getValue();
    var quota_soft_limit_in_mb = task.variables.quota_soft_limit_in_mb.getDisplayValue().trim();
    var quota_soft_limit_in_gb = task.variables.quota_soft_limit_in_gb.getDisplayValue().trim();
    var quota_soft_limit_in_tb = task.variables.quota_soft_limit_in_tb.getDisplayValue().trim();
 
    var quota_hard_limit_in_mb = task.variables.quota_hard_limit_in_mb.getDisplayValue().trim();
    var quota_hard_limit_in_gb = task.variables.quota_hard_limit_in_gb.getDisplayValue().trim();
    var quota_hard_limit_in_tb = task.variables.quota_hard_limit_in_tb.getDisplayValue().trim();
 
    if (quotaUnit === 'tb') {
        // 1 TB = 1024 GB = 1024 * 1024 MB = 1024 * 1024 * 1024 * 1024 Bytes
        converted_soft_str = quota_soft_limit_in_tb * 1024 * 1024 * 1024 * 1024;
        converted_output_soft = converted_soft_str.toString();
       
        converted_hard_str = quota_hard_limit_in_tb * 1024 * 1024 * 1024 * 1024;
        converted_output_hard = converted_hard_str.toString();
 
 
 
    } else if (quotaUnit === 'gb') {
    // 1 GB = 1024 MB = 1024 * 1024 * 1024 Bytes
        converted_soft_str = quota_soft_limit_in_gb * 1024 * 1024 * 1024;
        converted_output_soft = converted_soft_str.toString();
       
        converted_hard_str = quota_hard_limit_in_gb * 1024 * 1024 * 1024;
        converted_output_hard = converted_hard_str.toString();
 
    } else if (quotaUnit === 'mb') {
    // 1 MB = 1024 * 1024 Bytes
        converted_soft_str = quota_soft_limit_in_mb * 1024 * 1024;
        converted_output_soft = converted_soft_str.toString();
       
        converted_hard_str = quota_hard_limit_in_mb * 1024 * 1024;
        converted_output_hard = converted_hard_str.toString();
    }
 
    var qtree_require = task.variables.qtree_requried.getValue();
    var qtree_name = task.variables.qtree_name.getDisplayValue().trim();
    var qtree_name_bcp = task.variables.qtree_name_bcp.getDisplayValue().trim();
    var qtree_type = task.variables.qtree_type.getDisplayValue().trim();
   
}
 
 
 
 
var parser = new JSONParser();
if (os_Type == 'Unix' && request_Type == 'Create' ) {  
//  restMessageName = 'Network Automation Prod';
   endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/960/launch/";
} else if (os_Type == 'Windows' && request_Type == 'Create' ) {
  // restMessageName = "Network Automation Prod";
   endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/959/launch/";
}else if (os_Type == 'Unix' && request_Type == 'Expand' ) {
  // restMessageName = 'Network Automation Prod';
   endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/962/launch/";
   
} else if (os_Type == 'Windows' && request_Type == 'Expand' ) {
  // restMessageName = "Network Automation Prod";
   endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/961/launch/";
}
var r = new sn_ws.RESTMessageV2('Network Automation Prod', 'POST');
r.setEndpoint(endpointURL);
//r.setBasicAuth(user, password);783,607
r.setRequestHeader("Accept", "application/json");
r.setRequestHeader('Content-Type', 'application/json');
//r.setMIDServer(mid_server);
r.setEccParameter('skip_sensor', true);
 
 
// Prepare the POST request body
var body = {};
body["extra_vars"] = {};
if (request_Type == 'Create' && os_Type == 'Unix' ){
    body["extra_vars"]["nas_ip"] = storage_ip_bkc;
    body["extra_vars"]["nas_policy_client_ip"] = server_Hostname;
    body["extra_vars"]["nas_svm_Name"] = svm_name_bkc;
    body["extra_vars"]["aggregate_name"] = aggregate_name_bkc;
    body["extra_vars"]["nas_vol_name"] = volume_name;
    body["extra_vars"]["nas_vol_size"] = converted_output + 'MB';
    if (export_Policy == 'new'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_new_bkc;
    }else if(export_Policy == 'existing'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_bkc;
    }
    body["extra_vars"]["nas_policy_ro_rule"] = policy_ro_rule;
    body["extra_vars"]["nas_policy_rw_rule"] = policy_rw_rule;
    body["extra_vars"]["nas_policy_superuser"] = policy_superuser;
    body["extra_vars"]["nas_policy_user_id"] = policy_user_id;
    body["extra_vars"]["nas_snapshot_policy"] = snapshot_policy_name_bkc;
    body["extra_vars"]["os_type"] = os_Type;
    body["extra_vars"]["nas_mount_path"] = mount_path;
    body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
    body["extra_vars"]["BCP_nas_policy_client_ip"] = server_Hostname;
    body["extra_vars"]["BCP_nas_svm_Name"] = svm_name_bcp;
    body["extra_vars"]["BCP_aggregate_name"] = aggregate_name_bcp;
    body["extra_vars"]["BCP_nas_vol_name"] = volume_name + '_DR';
    body["extra_vars"]["BCP_vol_size"] = converted_output + 'MB';
    if (export_Policy == 'new'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_new_bcp + '_DR';
    }else if(export_Policy == 'existing'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_bcp + '_DR';
    }
    body["extra_vars"]["BCP_nas_policy_ro_rule"] = policy_ro_rule;
    body["extra_vars"]["BCP_nas_policy_rw_rule"] = policy_rw_rule;
    body["extra_vars"]["BCP_nas_policy_superuser"] = policy_superuser;
    body["extra_vars"]["BCP_nas_policy_user_id"] = policy_user_id;
    body["extra_vars"]["BCP_nas_snapshot_policy"] = snapshot_policy_name_bcp;
    body["extra_vars"]["BCP_os_type"] = os_Type;
    body["extra_vars"]["BCP_nas_mount_path"] = mount_path + '_DR';
 
}else if (request_Type == 'Create' && os_Type == 'Windows' ){
    body["extra_vars"]["nas_ip"] = storage_ip_bkc;
    body["extra_vars"]["nas_policy_client_ip"] = server_Hostname;
    body["extra_vars"]["nas_svm_Name"] = svm_name_bkc;
    body["extra_vars"]["aggregate_name"] = aggregate_name_bkc;
    body["extra_vars"]["nas_vol_name"] = volume_name;
    body["extra_vars"]["nas_vol_size"] = converted_output + 'MB';
    if (export_Policy == 'new'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_new_bkc;
    }else if(export_Policy == 'existing'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_bkc;
    }
    body["extra_vars"]["nas_policy_ro_rule"] = policy_ro_rule;
    body["extra_vars"]["nas_policy_rw_rule"] = policy_rw_rule;
    body["extra_vars"]["nas_policy_superuser"] = policy_superuser;
    body["extra_vars"]["nas_policy_user_id"] = policy_user_id;
    body["extra_vars"]["qtree_require"] = qtree_require;
    if (qtree_require == 'yes'){
       body["extra_vars"]["space_hard_limit"] = converted_output_hard;
       body["extra_vars"]["space_soft_limit"] = converted_output_soft;
       body["extra_vars"]["nas_qtree_name"] = qtree_name;
       body["extra_vars"]["nas_qtree_type"] = qtree_type;
    }
    body["extra_vars"]["nas_share_name"] = share_name;
    body["extra_vars"]["nas_access_permission"] = access_permission;
    body["extra_vars"]["nas_user_type"] = os_Type;
    body["extra_vars"]["nas_usr_grp_permission"] = user_group_permission;
    body["extra_vars"]["nas_snapshot_policy"] = snapshot_policy_name_bkc;
    body["extra_vars"]["os_type"] = os_Type;
    body["extra_vars"]["nas_mount_path"] = mount_path;
    body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
    body["extra_vars"]["BCP_nas_policy_client_ip"] = server_Hostname;
    body["extra_vars"]["BCP_nas_svm_Name"] = svm_name_bcp;
    body["extra_vars"]["BCP_aggregate_name"] = aggregate_name_bcp;
    body["extra_vars"]["BCP_nas_vol_name"] = volume_name + '_DR';
    body["extra_vars"]["BCP_vol_size"] = converted_output + 'MB';
    if (export_Policy == 'new'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_new_bcp + '_DR';
    }else if(export_Policy == 'existing'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_bcp + '_DR';
    }
    body["extra_vars"]["BCP_nas_policy_ro_rule"] = policy_ro_rule;
    body["extra_vars"]["BCP_nas_policy_rw_rule"] = policy_rw_rule;
    body["extra_vars"]["BCP_nas_policy_superuser"] = policy_superuser;
    body["extra_vars"]["BCP_nas_policy_user_id"] = policy_user_id;
    body["extra_vars"]["BCP_nas_user_type"] = os_Type;
    body["extra_vars"]["BCP_nas_snapshot_policy"] = snapshot_policy_name_bcp;
    body["extra_vars"]["BCP_os_type"] = os_Type;
    body["extra_vars"]["BCP_nas_mount_path"] = mount_path + '_DR';
}else if (request_Type == 'Expand' && os_Type == 'Unix' ){
    body["extra_vars"]["nas_ip"] = storage_ip_bkc;
    body["extra_vars"]["nas_vol_name"] = volume_name;
    body["extra_vars"]["nas_expand_vol_size"] = converted_output + 'MB';
    body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
    body["extra_vars"]["BCP_nas_vol_name"] = volumeName_bcp;
    body["extra_vars"]["BCP_expand_vol_size"] = converted_output + 'MB';
   
 
}else if (request_Type == 'Expand' && os_Type == 'Windows' ){
    body["extra_vars"]["nas_ip"] = storage_ip_bkc;
    body["extra_vars"]["nas_vol_name"] = volume_name;
    body["extra_vars"]["nas_expand_vol_size"] = converted_output + 'MB';
    body["extra_vars"]["qtree_require"] = qtree_require;
    if (qtree_require == 'yes'){
     body["extra_vars"]["nas_qtree_name"] = qtree_name;
     body["extra_vars"]["nas_qtree_type"] = qtree_type;
    }
    body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
    body["extra_vars"]["BCP_nas_vol_name"] = volumeName_bcp;
    body["extra_vars"]["BCP_expand_vol_size"] = converted_output + 'MB';
   
}
 
// Set the request body
r.setRequestBody(JSON.stringify(body));
 
//// Log the body for debugging purposes
gs.info("TestMKSJSON" + JSON.stringify(body));
 
// Execute the POST request asynchronously and wait for the response
var response = r.executeAsync();
response.waitForResponse(160);
 
//to get the response body details like jobid,status of awx
var responseBody = response.getBody();
var httpStatus = response.getStatusCode();
var json_data = parser.parse(responseBody);
 
var id =  '' + json_data.id + '';
var status1 = '' + json_data.status + '';
gs.info("Value of id and status:" + id + status1);
 
 
workflow.scratchpad.job_id = id; //json_data.id.getDisplayValue().trim();
workflow.scratchpad.status = status1;

/////// Replicarion no 
var request_number = current.request.number.toString();
var request_item_number = current.number.toString();
var requester = current.variables.requester.getDisplayValue().trim();
var approver = current.variables.approver.getDisplayValue().trim();
var Size_Unit = current.variables.size_unit.getValue();
var size_mb = current.variables.size_in_mb.getDisplayValue().trim();
var size_Gb = current.variables.size_in_gb.getDisplayValue().trim();
var size_Tb = current.variables.size_in_tb.getDisplayValue().trim();
 
if (Size_Unit === 'tb') {
  converted_output = size_Tb * 1024 * 1024; // 1 TB = 1024 GB = 1024 * 1024 MB
} else if (Size_Unit === 'gb') {
  converted_output = size_Gb * 1024; // 1 GB = 1024 MB
} else if (Size_Unit === 'mb') {
  converted_output = size_mb; // 1024 MB
}
 
 
 
// Get RITM Sys ID
var vset = current.sys_id;
 
//Fetch the BKC Details
//Fetch the BKC Details
var task = new GlideRecord('sc_task');
task.addQuery('request_item.sys_id', vset);
task.addQuery('short_description', 'Task for Storage team');
task.query();
 
if (task.next()) {
    var os_Type = task.variables.os_type.getDisplayValue().trim();
    var server_Hostname = task.variables.server_hostname.getDisplayValue().trim();
    var replication_requried = task.variables.replication_required.getValue();
    var request_Type = task.variables.request_type.getDisplayValue().trim();
    var export_Policy = task.variables.export_policy_new_existing.getValue();
 
    var storage_ip_bkc = task.variables.storage_ip_bkc.getDisplayValue().trim();
    var storage_ip_bcp = task.variables.storage_ip_bcp.getDisplayValue().trim();
 
    var storage_location = task.variables.storage_location.getDisplayValue().trim();
 
   
    var svm_name_bkc = task.variables.svm_name.getDisplayValue().trim();
    var svm_name_bcp = task.variables.svm_name_bcp.getDisplayValue().trim();
 
    var export_policy_name_new_bkc = task.variables.export_policy_name_new.getDisplayValue().trim();
    var export_policy_name_new_bcp = task.variables.export_policy_name_new_bcp.getDisplayValue().trim();
 
    var export_policy_name_bkc = task.variables.export_policy_name.getDisplayValue().trim();
    var export_policy_name_bcp = task.variables.export_policy_name_bcp.getDisplayValue().trim();
 
    var aggregate_name_bkc = task.variables.aggregate_name.getDisplayValue().trim();
    var aggregate_name_bcp = task.variables.aggregate_name_bcp.getDisplayValue().trim();
 
   
    var snapshot_policy_name_bkc = task.variables.snapshot_policy_name.getValue();
    var snapshot_policy_name_bcp = task.variables.snapshot_policy_name_bcp.getValue();
 
    var share_name = task.variables.share_name.getDisplayValue().trim();
    var shareName_bkc = task.variables.share_name_bkc.getDisplayValue().trim();
    var shareName_bcp = task.variables.share_name_bcp.getDisplayValue().trim();
 
    var volume_name = task.variables.volume_name_bkc.getDisplayValue().trim();
    var volumeName_bcp = task.variables.volume_name_bcp.getDisplayValue().trim();
 
    var share_folder_name = task.variables.share_folder_name_bkc.getDisplayValue().trim();
    var share_folder_name_bcp = task.variables.share_folder_name_bcp.getDisplayValue().trim();
   
    var user_group_permission = task.variables.user_group_permission.getValue();
    var mount_path = task.variables.mount_path.getDisplayValue().trim();
    var policy_ro_rule = task.variables.policy_ro_rule.getDisplayValue().trim();
    var policy_rw_rule = task.variables.policy_rw_rule.getDisplayValue().trim();
    var policy_user_id = task.variables.policy_user_id.getDisplayValue().trim();
    var policy_superuser = task.variables.policy_superuser.getDisplayValue().trim();
    var access_permission = task.variables.access_permission.getValue();
 
    var quotaUnit = task.variables.quota_unit.getValue();
    var quota_soft_limit_in_mb = task.variables.quota_soft_limit_in_mb.getDisplayValue().trim();
    var quota_soft_limit_in_gb = task.variables.quota_soft_limit_in_gb.getDisplayValue().trim();
    var quota_soft_limit_in_tb = task.variables.quota_soft_limit_in_tb.getDisplayValue().trim();
 
    var quota_hard_limit_in_mb = task.variables.quota_hard_limit_in_mb.getDisplayValue().trim();
    var quota_hard_limit_in_gb = task.variables.quota_hard_limit_in_gb.getDisplayValue().trim();
    var quota_hard_limit_in_tb = task.variables.quota_hard_limit_in_tb.getDisplayValue().trim();
 
    if (quotaUnit === 'tb') {
        // 1 TB = 1024 GB = 1024 * 1024 MB = 1024 * 1024 * 1024 * 1024 Bytes
        converted_soft_str = quota_soft_limit_in_tb * 1024 * 1024 * 1024 * 1024;
        converted_output_soft = converted_soft_str.toString();
       
        converted_hard_str = quota_hard_limit_in_tb * 1024 * 1024 * 1024 * 1024;
        converted_output_hard = converted_hard_str.toString();
 
 
 
    } else if (quotaUnit === 'gb') {
    // 1 GB = 1024 MB = 1024 * 1024 * 1024 Bytes
        converted_soft_str = quota_soft_limit_in_gb * 1024 * 1024 * 1024;
        converted_output_soft = converted_soft_str.toString();
       
        converted_hard_str = quota_hard_limit_in_gb * 1024 * 1024 * 1024;
        converted_output_hard = converted_hard_str.toString();
 
    } else if (quotaUnit === 'mb') {
    // 1 MB = 1024 * 1024 Bytes
        converted_soft_str = quota_soft_limit_in_mb * 1024 * 1024;
        converted_output_soft = converted_soft_str.toString();
       
        converted_hard_str = quota_hard_limit_in_mb * 1024 * 1024;
        converted_output_hard = converted_hard_str.toString();
    }
    var qtree_require = task.variables.qtree_requried.getValue();
    var qtree_name = task.variables.qtree_name.getDisplayValue().trim();
    var qtree_name_bcp = task.variables.qtree_name_bcp.getDisplayValue().trim();
    var qtree_type = task.variables.qtree_type.getDisplayValue().trim();
   
}
 
var parser = new JSONParser();
gs.info(storage_location);
 
if (storage_location == 'BKC' && replication_requried == 'SVM_Level_Replication') {
    restMessageName = 'Network Automation Prod';
    if(request_Type == 'Create' && os_Type == 'Unix' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/964/launch/";
    }
    else if(request_Type == 'Expand' && os_Type == 'Unix' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/967/launch/";
    }
    else if(request_Type == 'Create' && os_Type == 'Windows' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/963/launch/";
    }
    else if(request_Type == 'Expand' && os_Type == 'Windows' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/965/launch/";
    }
 
}else if (storage_location == 'BKC' || storage_location == 'bkc') {
    restMessageName = 'Network Automation Prod';
    if(request_Type == 'Create' && os_Type == 'Unix' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/954/launch/";
    }
    else if(request_Type == 'Expand' && os_Type == 'Unix' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/958/launch/";
    }
    else if(request_Type == 'Create' && os_Type == 'Windows' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/952/launch/";
    }
    else if(request_Type == 'Expand' && os_Type == 'Windows' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/956/launch/";
    }
 
}
else if (storage_location == 'BCP' || storage_location == 'bcp') {
  restMessageName = "Network Automation Prod";
  if(request_Type == 'Create' && os_Type == 'Unix' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/953/launch/";
    }
    else if(request_Type == 'Expand' && os_Type == 'Unix' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/957/launch/";
    }
    else if(request_Type == 'Create' && os_Type == 'Windows' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/951/launch/";
    }
    else if(request_Type == 'Expand' && os_Type == 'Windows' ){
         endpointURL = "https://ansibleprodcontroler.nseroot.com/api/v2/job_templates/955/launch/";
    }
}
 
 
 
var r = new sn_ws.RESTMessageV2(restMessageName, 'POST');
r.setEndpoint(endpointURL);
//r.setBasicAuth(user, password);783,607
r.setRequestHeader("Accept", "application/json");
r.setRequestHeader('Content-Type', 'application/json');
//r.setMIDServer(mid_server);
r.setEccParameter('skip_sensor', true);
 
 
// Prepare the POST request body
var body = {};
body["extra_vars"] = {};
if (storage_location == 'BKC'){
    if (request_Type == 'Create' && os_Type == 'Unix' ){
        body["extra_vars"]["nas_ip"] = storage_ip_bkc;
        body["extra_vars"]["nas_policy_client_ip"] = server_Hostname;
        body["extra_vars"]["nas_svm_Name"] = svm_name_bkc;
        body["extra_vars"]["aggregate_name"] = aggregate_name_bkc;
        body["extra_vars"]["nas_vol_name"] = volume_name;
        body["extra_vars"]["nas_vol_size"] = converted_output + 'MB';
        if (export_Policy == 'new'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_new_bkc;
        }else if(export_Policy == 'existing'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_bkc;
        }
        body["extra_vars"]["nas_policy_ro_rule"] = policy_ro_rule;
        body["extra_vars"]["nas_policy_rw_rule"] = policy_rw_rule;
        body["extra_vars"]["nas_policy_superuser"] = policy_superuser;
        body["extra_vars"]["nas_policy_user_id"] = policy_user_id;
        body["extra_vars"]["nas_snapshot_policy"] = snapshot_policy_name_bkc;
        body["extra_vars"]["os_type"] = os_Type;
        body["extra_vars"]["nas_mount_path"] = mount_path;
 
    }else if (request_Type == 'Create' && os_Type == 'Windows' ){
        body["extra_vars"]["nas_ip"] = storage_ip_bkc;
        body["extra_vars"]["nas_policy_client_ip"] = server_Hostname;
        body["extra_vars"]["nas_svm_Name"] = svm_name_bkc;
        body["extra_vars"]["aggregate_name"] = aggregate_name_bkc;
        body["extra_vars"]["nas_vol_name"] = volume_name;
        body["extra_vars"]["nas_vol_size"] = converted_output + 'MB';
        if (export_Policy == 'new'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_new_bkc;
        }else if(export_Policy == 'existing'){
        body["extra_vars"]["nas_policy_name"] = export_policy_name_bkc;
        }
        body["extra_vars"]["nas_policy_ro_rule"] = policy_ro_rule;
        body["extra_vars"]["nas_policy_rw_rule"] = policy_rw_rule;
        body["extra_vars"]["nas_policy_superuser"] = policy_superuser;
        body["extra_vars"]["nas_policy_user_id"] = policy_user_id;
        body["extra_vars"]["qtree_require"] = qtree_require;
        if(qtree_require == 'yes'){
           body["extra_vars"]["space_hard_limit"] = converted_output_hard;
           body["extra_vars"]["space_soft_limit"] = converted_output_soft;
           body["extra_vars"]["nas_qtree_name"] = qtree_name;
           body["extra_vars"]["nas_qtree_type"] = qtree_type;
        }
        body["extra_vars"]["nas_share_name"] = share_name;
        body["extra_vars"]["nas_access_permission"] = access_permission;
        body["extra_vars"]["nas_user_type"] = os_Type;
        body["extra_vars"]["nas_usr_grp_permission"] = user_group_permission;
        body["extra_vars"]["nas_snapshot_policy"] = snapshot_policy_name_bkc;
        body["extra_vars"]["os_type"] = os_Type;
        body["extra_vars"]["nas_mount_path"] = mount_path;
   
    }else if (request_Type == 'Expand' && os_Type == 'Unix' ){
        body["extra_vars"]["nas_ip"] = storage_ip_bkc;
        body["extra_vars"]["nas_vol_name"] = volume_name;
        body["extra_vars"]["nas_expand_vol_size"] = converted_output + 'MB';
 
    }else if (request_Type == 'Expand' && os_Type == 'Windows' ){
        body["extra_vars"]["nas_ip"] = storage_ip_bkc;
        body["extra_vars"]["nas_vol_name"] = volume_name;
        body["extra_vars"]["nas_expand_vol_size"] = converted_output + 'MB';
        body["extra_vars"]["qtree_require"] = qtree_require;
        if(qtree_require == 'yes'){
           body["extra_vars"]["nas_qtree_name"] = qtree_name;
           body["extra_vars"]["nas_qtree_type"] = qtree_type;
        }
    }
 
}else if(storage_location == 'BCP'){
    if (request_Type == 'Create' && os_Type == 'Unix' ){
        body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
        body["extra_vars"]["BCP_nas_policy_client_ip"] = server_Hostname;
        body["extra_vars"]["BCP_nas_svm_Name"] = svm_name_bcp;
        body["extra_vars"]["BCP_aggregate_name"] = aggregate_name_bcp;
        body["extra_vars"]["BCP_nas_vol_name"] = volumeName_bcp;
        body["extra_vars"]["BCP_vol_size"] = converted_output + 'MB';
        if (export_Policy == 'new'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_new_bcp;
        }else if(export_Policy == 'existing'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_bcp;
        }
        body["extra_vars"]["BCP_nas_policy_ro_rule"] = policy_ro_rule;
        body["extra_vars"]["BCP_nas_policy_rw_rule"] = policy_rw_rule;
        body["extra_vars"]["BCP_nas_policy_superuser"] = policy_superuser;
        body["extra_vars"]["BCP_nas_policy_user_id"] = policy_user_id;
        body["extra_vars"]["BCP_nas_snapshot_policy"] = snapshot_policy_name_bcp;
        body["extra_vars"]["BCP_os_type"] = os_Type;
        body["extra_vars"]["BCP_nas_mount_path"] = mount_path;
 
    }else if (request_Type == 'Create' && os_Type == 'Windows' ){
        body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
        body["extra_vars"]["BCP_nas_policy_client_ip"] = server_Hostname;
        body["extra_vars"]["BCP_nas_svm_Name"] = svm_name_bcp;
        body["extra_vars"]["BCP_aggregate_name"] = aggregate_name_bcp;
        body["extra_vars"]["BCP_nas_vol_name"] = volumeName_bcp;
        body["extra_vars"]["BCP_vol_size"] = converted_output + 'MB';
        if (export_Policy == 'new'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_new_bcp;
        }else if(export_Policy == 'existing'){
        body["extra_vars"]["BCP_nas_policy_name"] = export_policy_name_bcp;
        }
        body["extra_vars"]["BCP_nas_policy_ro_rule"] = policy_ro_rule;
        body["extra_vars"]["BCP_nas_policy_rw_rule"] = policy_rw_rule;
        body["extra_vars"]["BCP_nas_policy_superuser"] = policy_superuser;
        body["extra_vars"]["BCP_nas_policy_user_id"] = policy_user_id;
        body["extra_vars"]["qtree_require"] = qtree_require;
        if(qtree_require == 'yes'){
           body["extra_vars"]["BCP_space_hard_limit"] = converted_output_hard;
           body["extra_vars"]["BCP_space_soft_limit"] = converted_output_soft;  
           body["extra_vars"]["BCP_nas_qtree_name"] = qtree_name_bcp;
           body["extra_vars"]["BCP_nas_qtree_type"] = qtree_type;
        }
        body["extra_vars"]["BCP_nas_share_name"] = share_name;
        body["extra_vars"]["BCP_nas_access_permission"] = access_permission;
        body["extra_vars"]["BCP_nas_user_type"] = os_Type;
        body["extra_vars"]["BCP_nas_usr_grp_permission"] = user_group_permission;
        body["extra_vars"]["BCP_nas_snapshot_policy"] = snapshot_policy_name_bcp;
        body["extra_vars"]["BCP_os_type"] = os_Type;
        body["extra_vars"]["BCP_nas_mount_path"] = mount_path;
   
    }else if (request_Type == 'Expand' && os_Type == 'Unix' ){
        body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
        body["extra_vars"]["BCP_nas_vol_name"] = volumeName_bcp;
        body["extra_vars"]["BCP_expand_vol_size"] = converted_output + 'MB';
 
    }else if (request_Type == 'Expand' && os_Type == 'Windows' ){
        body["extra_vars"]["BCP_nas_ip"] = storage_ip_bcp;
        body["extra_vars"]["BCP_nas_vol_name"] = volumeName_bcp;
        body["extra_vars"]["BCP_expand_vol_size"] = converted_output + 'MB';
        body["extra_vars"]["qtree_require"] = qtree_require;
        if(qtree_require == 'yes'){
           body["extra_vars"]["BCP_nas_qtree_name"] = qtree_name_bcp;
           body["extra_vars"]["BCP_nas_qtree_type"] = qtree_type;
        }
    }
}
// Set the request body
r.setRequestBody(JSON.stringify(body));
 
//// Log the body for debugging purposes
gs.info("TestMKSJSON" + JSON.stringify(body));
 
// Execute the POST request asynchronously and wait for the response
var response = r.executeAsync();
response.waitForResponse(160);
 
//to get the response body details like jobid,status of awx
var responseBody = response.getBody();
var httpStatus = response.getStatusCode();
var json_data = parser.parse(responseBody);
 
var id =  '' + json_data.id + '';
var status1 = '' + json_data.status + '';
gs.info("Value of id and status:" + id + status1);
 
 
workflow.scratchpad.job_id = id; //json_data.id.getDisplayValue().trim();
workflow.scratchpad.status = status1;
