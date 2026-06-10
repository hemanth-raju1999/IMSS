#### **ANSIBLE - OPENSTACK**





###### **STEP - 1:**



&nbsp;	Install OpenStack collections in ansible controller

&nbsp;       **URL:** https://galaxy.ansible.com/ui/repo/published/openstack/cloud/



###### **STEP - 2:**

&nbsp;	Install OpenStack SDK on controller nodes

&nbsp;	**CMD:** pip install openstacksdk



###### **STEP - 3:**

&nbsp;	Create clouds.yaml file in controllers (~/.config/openstack/clouds.yaml)



clouds.yaml:

&nbsp;	clouds:

&nbsp;	myopenstack:

&nbsp;		auth:

&nbsp;		auth\_url: http://172.16.3.79/identity/v3

&nbsp;		username: hemanth

&nbsp;		password: Hemanth@123

&nbsp;		project\_name: demo

&nbsp;		user\_domain\_name: Default

&nbsp;		project\_domain\_name: Default

&nbsp;		region\_name: RegionOne



###### **STEP - 4:**

&nbsp;	export PATH=$HOME/.local/bin:$PATH



make it permanent for the awx user:

echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc



source ~/.bashrc



Also check directly:

ls ~/.local/bin/openstack



###### **STEP - 5:**

&nbsp;	Check connectivity of OpenStack with OpenStack Commands from controllers

&nbsp;	Example:

&nbsp;		openstack --version

&nbsp;		openstack --os-cloud myopenstack token issue

&nbsp;		openstack --os-cloud myopenstack server list

&nbsp;		openstack --os-cloud myopenstack floating ip list



