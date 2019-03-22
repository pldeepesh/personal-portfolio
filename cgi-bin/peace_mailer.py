/usr/bin/python
#peace mailer
import smtplib
import random

def send_mail(users,name,message):
	
	message = "From:Quoter Bot<jarvis.newsteller@gmail.com>"+"\nSubject: Bhagwad Gita Quote of the day \n\n"+'Hello '+name+',\n\n Hope you are doing great. Here is your daily dose of inspirational quote,\n\n'+message.upper()+"\n\nTo unsubscribe please email pldeepesh@gmail.com\n\nThanks\nYour JARVIS"
	server = smtplib.SMTP('smtp.gmail.com','587')
	server.ehlo()
	server.starttls()
	server.login('jarvis.newsteller@gmail.com','jarvis123')
	server.sendmail('Quoter Bot<jarvis.newsteller@gmail.com>',users,message)
	server.close()

def select_quote():
	a=[]
	used_quotes=[]
	file = open('gita.txt','r')
	for i in file.read().split('\n'):
		a.append(i)
	file.close()
	random_number = random.randint(0,len(a)-1)
	file = open('used_quotes.txt','r')
	for j in file.read().split('\n'):
		used_quotes.append(j)
	file.close()
	if len(a)==len(used_quotes):
		send_mail('pldeepesh@gmail.com','deepesh','The Quotes are exhausted, please add new ones at the earliest')
		return False
	elif a[random_number] not in used_quotes:
		return a[random_number]
	else:
		select_quote()
	
def used_quote(quote):
	file = open('used_quotes.txt','a+')
	file.write(quote)
	file.close()
	print('added Quote to the database')

Quote_of_the_day = select_quote()
if Quote_of_the_day!=False:
	used_quote(Quote_of_the_day)
	mailing_list ={'Deepesh':'deepesh.p@practo.com'}
	# ,'Gopi':'gopi.mopur@practo.com','Pradip':'pradip.singh@practo.com','Rahul':'29rahulkumars@gmail.com','Shashank':'bs.shashank44@gmail.com','Sudheer':'kacharlasudheer@gmail.com'}
	for i in mailing_list:
		send_mail(mailing_list[i],i,Quote_of_the_day)
		print('Emailing ..'+mailing_list[i])
