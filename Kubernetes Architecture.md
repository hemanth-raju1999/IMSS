### **Kubernetes Architecture:**



We first look at the architecture at a high level, and then we drill down into each of these components. We see what their roles and responsibilities are and how they are configured. Finally, you go through a practice test where you look at an existing cluster and are asked to identify various details with respect to these components in the cluster.



We are going to use an analogy of Ships to understand the architecture of Kubernetes. In this lecture we will look at it at a high level and we will look at each component in much more detail in the later videos.



We have two kinds of ships in this example. Cargo ships that does the actual work of carrying containers across the sea and control ships that are responsible for monitoring and managing the cargo ships.



The Kubernetes cluster consists of a set of nodes – which may be physical or virtual servers – on premise or on cloud - that host applications in the form of containers. These relate to the cargo ships in this analogy.  The worker nodes in the cluster are ships that can load containers.



The control ships relate to the master node in the Kubernetes cluster.  The master node is responsible for managing the kubernetes cluster, storing information regarding different nodes, planning which container goes where, monitoring the nodes and containers on them etc.



The master node does all of these using a set of components together known as the control plane components. We will look at each of those components now.



A scheduler identifies the right node to place a container on, based on the containers resources requirements, the worker nodes capacity or any other policies or constraints such as taints and tolerations or node affinity rules that are on them. We will look at these in much more detail with examples and practice tests later in this course. We have a whole section on scheduling alone.



In Kubernetes, we have controllers available that take care of different areas. The node-controller takes care of nodes. They are responsible for onboarding new nodes to the cluster, handling situations where nodes become unavailable or gets destroyed etc. And the replication controller ensures that the desired number of containers are running at all times in a replication group.



The kube-apiserver is the primary management component of kubernetes. The kube-api server is responsible for orchestrating all operations within the cluster. It exposes the Kubernetes API which is used by externals users to perform management operations on the cluster, as well as the various controllers to monitor the state of the cluster and make the necessary changes as required, and by the worker nodes to communicate with the server.





The captain of the ship is the kubelet in Kubernetes.  A kubelet is an agent that runs on each node in a cluster. It listens for instructions from the kube-api server and deploys or destroys containers on the nodes as required. The kube-api server periodically fetches status reports from the kubelet to monitor the state of nodes and the containers on them.



The kube-proxy service ensures that the necessary rules are in place on the worker nodes to allow the containers running on them to reach each other.

