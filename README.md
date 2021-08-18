# vue-demo project

### Check for listening port
```
lsof -i -n -P|grep LISTEN
```

### Stop/Delete a running node instance
```
pm2 stop {name}
pm2 delete {name}
```

### Create and listen for a node instance
```
pm2 start npm -- start -- --port 5000
```
