import sys
file = open("/var/www/list/riot.txt","r") 
Counter = 0
  
# Reading from file 
Content = file.read() 
CoList = Content.split("\n") 
  
for i in CoList: 
    if i: 
        Counter += 1
          
if Counter == 0:
    print("REFILL NEEDED")
    sys.exit()


print(Counter) 
sys.exit()