from get_data import getFirebaseAsDict

bad_list1 = getFirebaseAsDict()[0]
bad_list2 = getFirebaseAsDict()[1]
list1 = []
list2 = []
for k,v in bad_list1.iteritems():
  list1.append(v)
if bad_list2:
  for k,v in bad_list2.iteritems():
    list2.append(v)

def make_output(list, dest_file):
  c = {"Current Cash": '1000',
  "Accounts Receivable": '0',
  "Accounts Payable":  '0'
  }

  e = {
  "Start Period": '2014-6-22',
  "Period Length": '60',
  }

  current = (c["Current Cash"] + ',' + c["Accounts Receivable"]+ ',' + c["Accounts Payable"])

  period = int(e["Period Length"])

  d2 = [0]*period
  d3 = [0]*period

  date = e["Start Period"]
  ndx = date.split('-')

  year = int(ndx[0])
  month = int(ndx[1])
  day = int(ndx[2])

  d2[0] = date
  d3[0] = current

  for x in range (1,int(e["Period Length"])):			#Creating 2 arrays of date and current values

    day = day + 1

    if ((day) > 30):
      day = day%30
      if ((month) == 12):
        month = 1
        year+= 1
      else:
        month+=1

    date =  (str(year) + '-' + str(month) + '-' + str(day))
    d2[x] = date
    d3[x] = current

  for i in range(0,len(list)):
    #print '\n' + 'NEW i :' + str(i) +'\n'
    d = list[i]
    #print 'DELAY: ' + d['Delay by']
    #print d3
    amt = int(d['amount'])
    #print amt
    curDate = d['date']
    #print 'DATE: ' + curDate
    recurrance = int(d['recurrence'])
    #print list
    delay = int(d["delay_by"])
    loan = int(d["loan_principal"])
    terms = d["terms"]
    days = int(d["days"])
    loc = d2.index(curDate)
    indicator = False

    if terms!= '-1':
      #print 'terms'
      spTerms = terms.split('/')
      spTerms[1] = (spTerms[1].split(' '))[0]
      if (days >= 0 and days <= int(spTerms[1])):
        discount = float(amt)*(float(spTerms[0])/100)
        for j in range(loc,len(d3)):
          d3Values = (d3[j]).split(',')
          new = (d3Values[0] + ',' + d3Values[1] + ',' + str(0));
          d3[j] = new;


          #print 'LOCATION ' + str(loc + days)
        for j in range(loc+days-1,len(d3)):
          d3Values = (d3[j]).split(',')
          #print 'AMOUNT REDUCED: ' + str(amt - discount)
          curVal = int(d3Values[0])
          new = (str(curVal + (amt-discount))+ ',' + d3Values[1] + ',' + str(0-abs(amt)))
          d3[j] = new;


      elif days > 10:
        for j in range(loc,loc+days-1):
          d3Values = (d3[j]).split(',')
          accPay = abs(amt)
          new = (d3Values[0] + ',' + d3Values[1] + ',' + str(0));
          d3[j] = new;
        curVal = abs(int(d3Values[0])) + amt
        #Add to A/P until delay date
        for z in range(loc+days-1,len(d3)):
          d3Values = (d3[z]).split(',')
          new = (str(int(d3Values[0]) + amt) + ',' + d3Values[1] + ',' + '0')
          d3[z] = new
      #   print 'discount'
      #   discount = float(amt)*(float(spTerms[0])/100)
      #
      #   for j in range(loc,loc+days-1):
      #     d3Values = (d3[j]).split(',')
      #     curVal = int(d3Values[0])
      #     accPay = int(d3Values[2])
      #     accPay+=abs(amt)
      #     new = (d3Values[0] + ',' + d3Values[1] + ',' + str(accPay))
      #     d3[j] = new
      #
      #
      #   for j in range(loc+days-1,len(d3)):
      #     d3Values = (d3[j]).split(',')
      #     curVal = int(d3Values[0])
      #     accPay = int(float(d3Values[2]))
      #     accPay+=abs(amt)
      #     new = (str(curVal + (amt-discount))+ ',' + d3Values[1] + ',' + str(accPay-abs(amt)))
      #
      #
      #   # print d3
      #
      # elif days > 10:
      #   print 'no discount'
      #
      #   for j in range(loc,loc+days-1):
      #     d3Values = (d3[j]).split(',')
      #     new = (d3Values[0] + ',' + d3Values[1] + ',' + str(accPay))
      #     d3[j] = new
      #
		  #    #Add to A/P until delay date
      #   counts2 = 0
      #   for j in range(loc+days-1,len(d3)):
      #     counts2 +=1
      #     # print 'counts2: ' + str(counts2)
      #     d3Values = (d3[j]).split(',')
      #     curVal = int(d3Values[0]) + amt
      #     new = (str(curVal) + ',' + d3Values[1] + ',' + str(accPay - abs(amt)))
      #     d3[j] = new
        # print d3
    else:
      if delay == 0:																	#Cash payement non recurring
        if (recurrance) == 0:

          for i in range (loc,len(d3)):
            d3Values = (d3[i]).split(',')
            curVal = int(d3Values[0]) + amt
            new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2])
            d3[i] = new

        elif(recurrance) > 0:	#Cash payment recurring
          # print 'recurring'
          #print recurrance
          #print loc

          start = loc
          next = start + recurrance
          while next <= len(d3):


            for j in range (start,next):
              d3Values = (d3[j]).split(',')
              curVal = int(float(d3Values[0]) + amt)
              new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2])
              d3[j] = new

            start = next - 1
            next = start + recurrance
          counts = 0
          if start < len(d3):
            for j in range(start,len(d3)):
              counts+=1
              # print counts
              d3Values = (d3[j]).split(',')
              curVal = int(float(d3Values[0]) + amt)
              new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2])
              d3[j] = new

      elif int(delay) > 0:															#Delayed payment
        if (recurrance) == 0:
          #print 'delayed nonRecurring(credit)'
          start = loc
          next = start + delay


          for j in range(start, next-1):								     	 #Transfer from A/R to CF
            d3Values = (d3[j]).split(',')
            curVal = abs(int(d3Values[1])) + amt
            new = (d3Values[0] + ',' + str(curVal) + ',' + d3Values[2])		     #Add to A/R until delay date
            d3[j] = new

          for j in range(next-1,len(d3)):
            d3Values = (d3[j]).split(',')
            curVal = int(d3Values[0]) + amt
            new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2])
            d3[j] = new
        elif (recurrance) > 0:
          print 'delayed Recurring (credit)'										#########################3

          current = loc
          delayTime = current + delay

          while delayTime <= len(d3):

            for j in range(current,delayTime-1):
              d3Values = (d3[j]).split(',')
              curVal = abs(int(d3Values[1])) + amt
              new = (d3Values[0] + ',' + str(curVal) + ',' + d3Values[2])
              d3[j] = new



            for j in range(delayTime-1,len(d3)):
              d3Values = (d3[j]).split(',')
              curVal = abs(int(d3Values[1]))
              new = (str(int(d3Values[0]) + amt) + ',' + str(curVal - amt)+ ',' + d3Values[2])
              d3[j] = new

            current+=recurrance
            delayTime = current + delay

          if current < len(d3):
            for j in range(current,len(d3)):
              d3Values = (d3[j]).split(',')
              new = (str(int(d3Values[0]) + amt) + ',' + str(curVal - amt)+ ',' + d3Values[2])
              d3[j] = new

      if loan > 0:

        #print 'Loan'
        rate = float(d["annual_rate"])
        matDate = d["maturity_date"]
        payment = int(d["monthly_payment"])

        start = loc

        next = loc + 30
        count = 1

        while next <= len(d3):
          start = loc
          for j in range (start,next-1):
            d3Values = (d3[j]).split(',')
            curVal = int(d3Values[0])
            accPay = int(d3Values[2])

            curVal+=loan
            accPay+=loan
            new = (str(curVal) + ',' + d3Values[1] + ',' + str(accPay))
            d3[j] = new


          interest = loan*rate*(count/12)





          for j in range(next-1,len(d3)):
            d3Values = (d3[j]).split(',')
            curVal = int(d3Values[0])
            accPay = int(d3Values[2])

            accPay-= payment
            accPay+= interest
            curVal-= payment

            new = (str(curVal) + ',' + d3Values[1] + ',' + str(accPay))
            d3[j] = new

          start = next
          next+=30


  output_list = []
  for i in range(0, len(d2)):
    tmp = {}
    tmp["date"] = d2[i]
    tmp["value"] = d3[i].split(',')[0]
    output_list.append(tmp)
  f = open(dest_file, 'w')
  f.write(str(output_list))
  f.close()

make_output(list1, 'assets/js/output1.txt')
if list2:
  make_output(list2, 'assets/js/output2.txt')
else:
  f = open('assets/js/output2.txt', 'w')
  f.close()
