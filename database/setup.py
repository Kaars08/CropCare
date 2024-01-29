import subprocess

try:
    subprocess.run(["wget", "https://github.com/pocketbase/pocketbase/releases/download/v0.21.1/pocketbase_0.21.1_linux_amd64.zip"], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    subprocess.run(["unzip", "pocketbase_0.21.1_linux_amd64.zip"], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    subprocess.run(["rm", "pocketbase_0.21.1_linux_amd64.zip"], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    print("Downloaded Pocketbase")
except Exception as e:
    print(f"Error: e")
