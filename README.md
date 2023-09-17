# Geneza

To run in museum mode:

1. hardware setup
   1. make sure the lan cable is plugged in a standard lan port on the router (not the Internet port)
   2. put all shapes in the holes
   3. after the server is on, remove all shapes and place them again
2. PC setup
   1. Connect to wifi Mikrotik
   2. Make sure your IP address is 192.168.88.1 (if not - hardcode it from network adapter settings) 
   3. Start the "start_server.bat" (it runs node index.js command in the project folder)
3. Router setup
   1. you need to assign the 192.168.88.101 IP address to the server laptop and save it