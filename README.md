##Александар Крстевски 156013 Овој проект е семинарска по предметот веб програмирање на факултетот ФИНКИ 

Во ова git repository постои база која е пополнета со примери(тимови,играчи,натпревари,админ,корисник)

1.potrebno e FootballManager.mdf i FootballManager_log da gi stavite na
slednata pateka:<br />
C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SERVERSQL2014\MSSQL\DATA
<br />
2.Otvarate Microsoft SQL Server Studio<br />
3.se najavuvate so Windows Authentication<br />
4.desen klik na Database pa klikate Attach<br />
5.Klikate Add pa go odbirate FootballManager.mdf pa potoa Ok pa povtorno Ok<br />
6.Go otvarate proektot MSR vo IntelliJ kako java springboot aplikacija<br />
7.vo IntelliJ vo application.properties gi stavate vasite podatoci za username i password spored SQL Server Authentication najavata vo
Microsoft SQL Server Studio<br />
spring.datasource.username=???<br />
spring.datasource.password=???<br />
8.Go otvarate proektot virtual-football-manager kako react-Js aplikacija i klikate na dijalogot npm-install <br />
9.gi startuvate dvete<br />


админот е alek.krstevski@mail.com
лозинката е 123456

корисник е name@example.com
лозинката е 123456


Овој проект преставува online игра каде корисниците ќе можат да креираат виртуелен фудбалски тим и да добиваат поени според  резултатите од вистински фудбалски натпревари.<br />
Во оваа игра корисниците ќе можат да креираат виртуални тимови со играчи од Англиската Премиер Лига.<br />


![](images/home.jpg)<br />

<br />
За да еден корисник учествува во оваа игра потребно е да се регистрира и да креира виртуален тим.<br />

![](images/register.jpg)
Откако ќе се регистрира ќе треба да се најави<br />
![](images/login.jpg)

<br />
За да креирате тим потребно е да одберето Create Team во навигациското мени.<br />

![](images/createfantasyteam.jpg)

<br />

Потребно е прво да се одбере позиција па потоа да се одбере еден од играчите од листата понудени
![](images/fantasyteamerror.jpg)


<br />

За да го зачувате тимот треба да се притисни копчето Save.<br />
![](images/fantasyteam.jpg)
<br />

Пред почетокот на сезоната корисниците ќе треба да ги креираат своите тимови.
После секое коло админот ќе треба да ги внесе натпреварите врз основа на изиграните натпревари во Англиската Премиер Лига.
<br />
![](images/adminpanel.jpg)

<br />
Админот ќе може да креира тимови за наредните сезони и да додава играчи доколку има некои трансфери.<br />


Админот ќе може да креира натпревари
Внесува два тима,играчи кои постигнале голови и асистенции и резултатот од натпреварот.
врз основа на овие параметри се пресметуваат бодови за виртуелните тимови на следниот начин:<br />
доколку тимот на играчот кој што е избран во виртуелниот тим победи играчот добива + 3 ако е нерешено + 1 дололку изгуби тимот нема поени. <br />
за постигнат гол +5 поени<br />
за асистенција + 3 поени<br />

![](images/admincreate.jpg)<br />
![](images/admincreate1.jpg)<br />



![](images/admincreate2.jpg)<br />


Потребно е да се зачуваат сите внесени информаци на копчето Save по што следува валидација доколку се е успешно ќе се прикаже зелен дијалог доколку не црвен.<br />
![](images/admincreate3.jpg)<br />

Админот креира Коло
![](images/admincreate4.jpg)<br />

Админот го внесува натпреварот во колото.
![](images/admincreate6.jpg)<br />

![](images/admincreate5.jpg)<br />



Доколку за било каков проблем потребно е менување на податоците како на пример:<br />
тимот падне во втора лига<br />
играчот направи трансфер во друга лига<br />
админот внесе погрешни податоци<br />
админот ќе може тоа да го семени:<br />

**Team** 
<br />
![](images/adminteam.jpg)
<br />
Со одбирање на Edit копчето.<br />
![](images/adminteamedit.jpg)
<br />

**Player** 
<br />
![](images/adminplayer.jpg)
<br />
Со одбирање на Edit копчето.<br />
![](images/adminplayeredit.jpg)
<br />

**Match**  
<br />
![](images/adminmatch.jpg)
<br />
Со одбирање на Edit копчето.<br />
![](images/adminmatchedit.jpg)
<br />

**GameWeek**  
<br />
![](images/admingameweek.jpg)<br />

Најавениот корисникот ќе може да ги гледа натпреварите и резулататите.
![](images/matchresult.jpg)<br />

Најавениот корисникот ќе може да ја гледа моменталната табела на Англиската Премиер Лига
![](images/Leaguetable.jpg)<br />

Најавениот корисникот ќе може да ги гледа натпреварите по кола со одбирање на натпреватот ке може да ги види играчите кои постигнале погодок.
![](images/gameweek.jpg)<br />

Најавениот корисникот ќе може да ги гледа табела од сите виртуални тимови.
![](images/fantasytable.jpg)<br />

Најавениот корисникот ќе може да ги види:<br />
Најдобрите 10 играчи <br />
5 Тимовите кои постигнале највеќе голови<br />
<br />
![](images/stats.jpg)<br />



