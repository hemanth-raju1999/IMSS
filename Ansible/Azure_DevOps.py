import requests
import json
import os
import time
import sys
import urllib3

# Suppress SSL certificate warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Ansible Tower configuration
TOWER_HOST = "https://172.16.3.42"
TOWER_USERNAME = sys.argv[1]
TOWER_PASSWORD = sys.argv[2]
JOB_TEMPLATE_ID = sys.argv[3]

# Proxy configuration
PROXY = {
    "http": os.getenv("HTTP_PROXY"),
    "https": os.getenv("HTTPS_PROXY")
}


def launch_job_template(extra_vars=None):

    # API URL to launch job template
    api_url = f"{TOWER_HOST}/api/v2/job_templates/{JOB_TEMPLATE_ID}/launch/"

    # Authentication
    auth = (TOWER_USERNAME, TOWER_PASSWORD)

    # Headers
    headers = {
        "Content-Type": "application/json"
    }

    # Payload with extra variables
    payload = {}
    if extra_vars:
        payload["extra_vars"] = extra_vars

    # Make the request to launch the job template
    response = requests.post(
        api_url,
        auth=auth,
        headers=headers,
        json=payload,
        proxies=PROXY,
        verify=False
    )

    if response.status_code == 201:
        job = response.json()
        job_id = job.get("id")
        print(f"Job launched successfully with ID: {job_id}")
        return job_id
    else:
        print("Failed to launch job.")
        print("Response Code:", response.status_code)
        print("Response:", response.text)
        sys.exit(1)


def check_job_status(job_id):

    # API URL to check job status
    api_url = f"{TOWER_HOST}/api/v2/jobs/{job_id}/"

    # Authentication
    auth = (TOWER_USERNAME, TOWER_PASSWORD)

    while True:

        response = requests.get(
            api_url,
            auth=auth,
            proxies=PROXY,
            verify=False
        )

        if response.status_code == 200:
            job = response.json()
            status = job.get("status")
            print(f"Job Status: {status}")

            if status in [
                "successful",
                "failed",
                "error",
                "canceled"
            ]:
                return status

        else:
            print("Failed to retrieve job status.")
            print("Response Code:", response.status_code)
            print("Response:", response.text)
            sys.exit(1)

        # Wait before checking again
        time.sleep(10)


if __name__ == "__main__":

    # Example extra variables
    extra_vars = {}

    job_id = launch_job_template(extra_vars)

    if job_id:

        job_status = check_job_status(job_id)

        if job_status == "successful":
            print("The job completed successfully.")
            sys.exit(0)

        else:
            print(
                f"The job did not complete successfully. "
                f"Status: {job_status}"
            )
            sys.exit(1)
