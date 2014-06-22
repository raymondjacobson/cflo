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

	day = day + 1;

	if ((day) > 30):
		day = day%30
		if ((month) == 12):
			month = 1
			year+= 1;
		else:
			month+=1


	date =  (str(year) + '-' + str(month) + '-' + str(day))
	d2[x] = date
	d3[x] = current


for i in range(0,len(list)):
	#print '\n' + 'NEW i :' + str(i) +'\n'
	d = list[i]
	#print 'DELAY: ' + d['Delay by']


	amt = int(d['Amount'])
	curDate = d['Date']

	#print 'DATE: ' + curDate
	recurrance = int(d['Recurrance'])
	delay = int(d["Delay by"])
	loan = int(d["Loan Principal"])
	terms = d["Terms"]
	days = int(d["Days"])

	loc = d2.index(curDate)
	indicator = False;

	if terms!= '-1':
		#print 'terms'
		spTerms = terms.split('/')
		spTerms[1] = (spTerms[1].split(' '))[0]

		d3Values = (d3[loc]).split(',')
		curVal = int(d3Values[0])
		accPay = int(d3Values[2])


		accPay+=abs(amt);

		if (days >= 0 and days <= int(spTerms[1])):
			#print 'discount'
			discount = float(amt)*(float(spTerms[0])/100)
			new = (d3Values[0] + ',' + d3Values[1] + ',' + str(accPay));

			for j in range(loc,loc+days-1):
				d3[j] = new;

			new = (str(curVal + (amt+discount))+ ',' + d3Values[1] + ',' + str(accPay-abs(amt)))
			for j in range(loc+days-1,len(d3)):
				d3[j] = new;

		elif days > 10:
			#print 'no discount'

			d3Values = (d3[loc]).split(',')
			new = (d3Values[0] + ',' + d3Values[1] + ',' + str(accPay));

			for j in range(loc,loc+days-1):
				d3[j] = new;

			curVal = abs(int(d3Values[0])) + amt
			new = (str(curVal) + ',' + d3Values[1] + ',' + str(accPay - abs(amt)))		     #Add to A/P until delay date

			for j in range(loc+days-1,len(d3)):
				d3[j] = new;

	else:
		if delay == 0:																	#Cash payement non recurring
			if (recurrance) == 0:
				#print 'no delay (cash)'
				d3Values = (d3[loc]).split(',')
				curVal = int(d3Values[0]) + amt;
				new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2]);

				for i in range (loc,len(d3)):
					d3[i] = new;


			elif(recurrance) > 0:	#Cash payment recurring
				#print 'recurring'

				start = loc
				next = start + recurrance
				while next <= len(d3):

					d3Values = (d3[start]).split(',')
					curVal = int(d3Values[0]) + amt;
					new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2]);
					for j in range (start,next):
						d3[j] = new

					start = next - 1
					next = start + recurrance

				if start < len(d3):
					for j in range(start,len(d3)):
						d3[j] = new


		elif delay > 0:																#Delayed payment
			if (recurrance) == 0:
				#print 'delayed nonRecurring(credit)'
				start = loc
				next = start + delay
				d3Values = (d3[start]).split(',')
				curVal = abs(int(d3Values[1])) + amt
				new = (d3Values[0] + ',' + str(curVal) + ',' + d3Values[2])		     #Add to A/R until delay date

				for j in range(start, next-1):								     	 #Transfer from A/R to CF
					d3[j] = new

				curVal = int(d3Values[0]) + amt
				new = (str(curVal) + ',' + d3Values[1] + ',' + d3Values[2]);

				for j in range(next-1,len(d3)):
					d3[j] = new
			elif (recurrance) > 0:
				#print 'delayed Recurring (credit)'										#########################3

				current = loc
				delayTime = current + delay

				while delayTime <= len(d3):

					d3Values = (d3[current]).split(',')
					curVal = abs(int(d3Values[1])) + amt
					new = (d3Values[0] + ',' + str(curVal) + ',' + d3Values[2])

					for j in range(current,delayTime-1):
						d3[j] = new

					new = (str(int(d3Values[0]) + amt) + ',' + str(curVal - amt)+ ',' + d3Values[2])

					for j in range(delayTime-1,len(d3)):
						d3[j] = new

					current+=recurrance
					delayTime = current + delay



				if current < len(d3):
					for j in range(current,len(d3)):
						d3[j] = new

		if loan > 0:

			#print 'Loan'
			rate = float(d["Annual Rate"])
			matDate = d["Maturity Date"]
			payment = int(d["Monthly Payment"])

			start = loc
			d3Values = (d3[start]).split(',')
			curVal = int(d3Values[0])
			accPay = int(d3Values[2])

			curVal+=loan
			accPay+=loan
			new = (str(curVal) + ',' + d3Values[1] + ',' + str(accPay))
			next = loc + 30
			count = 1;

			while next <= len(d3):
				start = loc
				for j in range (start,next-1):
					d3[j] = new

				interest = loan*rate*(count/12)
				accPay-= payment
				accPay+= interest
				curVal-= payment
				new = (str(curVal) + ',' + d3Values[1] + ',' + str(accPay))

				for j in range(next-1,len(d3)):
					d3[j] = new

				start = next
				next+=30
#for z in d2:
#	print z

#for x in d3:
#	print x
