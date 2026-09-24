/* AIEA member directory — render + live search
   Renders semantic rows that CSS displays as a table (desktop)
   or stacked cards with data-labels (mobile). Search filters
   across company, address, email, tel and fax.
*/
(function () {
  "use strict";

  const csvData = `No,COMPANY,ADDRESS,TEL,Email,Fax
1,138 Capital Pte Ltd,"1 North Bridge Road #06-29 High Street Centre Singapore 179094",97458239,"gary@138-capital.com terence@138-capital.com",
2,2 Accurate Pte Ltd,"60 Jalan Lam Huat #05-68 Carros Centre Singapore 737869",98888885,jeremy@mycarholdings.asia,69255219
3,ABS Bus Pte Ltd,"38M Penjuru Road Singapore 609148",94503900,hr@absgroup.sg,
4,ACE Financial Services Pte Ltd,"237 Alexandra Road #05-11 The Alexcier Singapore 159929",67585115,keithoh@acecorp.com.sg,67595115
5,Allmotoring.sg,"200 Jalan Sultan #04-17 Textile Centre  Singapore 199018",81000999, fedwu@allmotoring.sg,69098609 
6,Andric Leasing,"181 Kitchener Road #01-08 Parkroyal Hotel @Kitchener Singapore 208534",62918008,andricleasing@singnet.com.sg,62915005
7,Auto Asia Pte Ltd,"60 Jalan Lam Huat #04-35 Carros Centre Singapore 737869","91266738 90182184",ryan@autoasia.com.sg,
8,Automotive Direct,"81A Clemenceau Ave #05-18 Singapore 239918",98618618,admin@automotivedirect.com.sg,68308228
9,AutoSoon Pte Ltd,"176 Sin Ming Drive #01-10 Sin Ming AutoCare Singapore 575721",64526657,soon@autosoon.net,64514618
10,Big Bird Automobiles Pte Ltd,"68 Jalan Jurong Kechil  #01-27  Singapore 596180",83238899,daniel@bb-automobiles.com,
11,Car Express Auto Trading,"73 Mackenzie Road Singapore 228729",69805254,carexpressautotrading1@gmail.com,69805253
12,Car House Pte Ltd,"210 Turf Club Road LOT B06 The Grandstand Singapore 287995",64620620,winstontan999@yahoo.com.sg,64686200 
13,Car Lingual Pte Ltd,"1 Bukit Batok Crescent #04-62 Wcega Plaza Singapore 658064",64690002,alphonsus@carlingual.com.sg,67626298
14,Carteala Pte Ltd,"8 Kaki Bukit Ave 4 #06-28 Premier @ Kaki Bukit Singapore 415875",60150970,contact@carteala.com,60150971
15,Chai Giap Auto Trading Pte Ltd,"1 Bukit Batok Crescent #05-56 WCEGA PLAZA Singapore 658064",64409611,chaigiap31@hotmail.com,64409622
16,Cheng Yong Credit Enterprises Pte Ltd,"5 Benoi Place Singapore 629926" ,67770666,ziyang@primetaxi.com.sg,67742608
17,COE Auto Trading,"18 Sin Ming Lane #02-03 Midview City  Singapore 573960","64571902 98229833",kenneth@coeauto.com.sg,
18,Convince Auto Pte Ltd,"29 First Lok Yang Road Singapore 629736",65561131,convinceapl@convinceauto.com.sg,65531131
19,Dave Motor Trading Company,"400 Balestier Road #02-12 Balestier Plaza Singapore 329802",62505955,davemotor@singnet.com.sg,62538286
20,Delgrow Automotive Pte Ltd,"33 Ubi Ave 3 #01-14/15 Vertex Singapore 408868",62518397,"angie@delgrow-sg.com lili@delgrow-sg.com",62518317
21,Eco Ev Pte Ltd,"1 Tampines North Drive 1 #03-21 T-SPACE Singapore 528559",90066212,eco_ev@yahoo.com,
22,Edmund Motor Pte Ltd,"1 Bukit Batok Crescent #02/33/34/35 WCEGA Plaza Singapore 658064",62513339,edmundmotor@gmail.com,62661939
23,Emperor Motors Pte Ltd,"91 Bencoolen Street Sunshine Plaza, #10-04 Singapore 189652",65436968,,65436918
24,Esteem Performance Pte Ltd,"Blk 5033 Ang Mo Kio Ind Park 2 #01-259 Singapore 569536",64841221,irisboh@esteemperf.com.sg,64847829
25,Exclusive Global Pte Ltd,"60 Jalan Lam Huat, Carros Center, #05-25 Singapore 737869",6777 8666,admin@exclusiveglobal.org,6337 7666
26,Finesse Holdings Pte Ltd,"66 Toh Tuck Road #08-04 Singapore 596730",62622722,jerrylow2722@gmail.com,62652722
27,Garage R Pte Ltd,"8 Tagore Drive #01-00 Singapore 787624",65544840,siewlee.wong@hks-garager.com.sg,64539123
28,Green Citi Tech (S) Pte Ltd,"1 Commonwealth Lane One Commonwealth #06-19 Singapore 149544",97422693,lydiaang@gcgroup.com.sg,
29,Henly Enterprises Co Pte Ltd,"61 Ubi Avenue 2 #02-05 Automobile Megamart Singapore 408898",63363133,keets@henly.com.sg,68460122
30,Hoe Beng Auto Trading,"3 Ang Mo Kio St 62 #01-20 Link @ AMK Singapore 569139",67450138,hoebengauto@yahoo.com.sg,68460138
31,Hong Hin Motor Works,"25 Kaki Bukit Road 4 #03-33 Synergy@KB Singapore 417800",96608182,honghinmotorworks@gmail.com,
32,Hua Yang Enterprise Pte Ltd,"47 jalan pemimpin Halcyon 2 #03-05 Singapore 577200",65519052,selina@huayang.com.sg,64531320
33,Jack Cars Enterprise Pte Ltd,"61 Ubi Avenue 2 #01-08/19/20 Automobile Megamart Singapore 408898",67441900,adminstrator@jackcars.com.sg,67444456
34,JCWC Automobile Pte Ltd,"21 Toh Guan Road East #01-21/22 Toh Guan Centre Singapore 608609",65696969,"wendychew@jcwc.com.sg admin@jcwc.com.sg",65692969
35,Jit Keong Trading Co Pte Ltd,"28 Benoi Place Singapore 629945",65624186,main@jitkeong.com.sg,68613533
36,JWG International Pte Ltd,"10 Ang Mo Kio Industrial Park 2A, #03-08 AMK AutoPoint, Singapore 568047",96988882,Jwg.international@yahoo.com,64841922 
37,Kuon Motors Pte Ltd,"37 Kallang Pudding Road #03-01 Singapore 349315",62510800,kuonmotors@gmail.com,67522007
38,Lay Auto Pte Ltd,"21 Toh Guan Road East #01-16/17 Toh Guan Centre Singapore 608609",64625828,andy@layauto.com,64681179
39,Leco Auto Pte Ltd,"61 Ubi Avenue 2 #01-05 Automobile Megamart Singapore 408898",68420070,cobin@leco.com.sg,68467446
40,Leco Prestige Pte Ltd,"61 Ubi Avenue 2 #04-04 Automobile Megamart Singapore 408898","64740566 97806972",sales@lecoprestige.com,68469983
41,Luxurie Auto Pte Ltd,"7030 Ang Mo Kio Ave 5 #B1-01 NorthStar @ AMK Singapore 569880",6222 8882,luxurieauto@yahoo.com.sg,6481 1916
42,M Label Auto Pte Ltd,"9 TAGORE LANE #01-04 SINGAPORE 787472",88238778,limzhanyi@mcorporations.sg,
43,Meyer Motors Pte Ltd,"30 Ubi Ave 3 #01-31 Vertex Singapore 408868",94776816,managers@meyermotors.sg,68098477 
44,Motorworld,"51 Ubi Avenue 1 #01-09 Paya Ubi Ind.Park, Singapore 408933",67470801,motorworld31@yahoo.com.sg,62875977
45,MV Traders Pte Ltd,"31 West Coast Highway #01-27 West Coast Car Mart Singapore 117864",67788862,sales@mvtraders.com.sg,67751447
46,Naga Motor Pte Ltd,"33 Sin Ming Drive #01-367  Singapore 575707",62850035,nagamotor@singnet.com.sg,64566788
47,Ole Supercars Pte Ltd,"21 Toh Guan Road East #01-04 Singapore 608609",67950777,ronpoh@olesupercars.com.sg,67953778
48,PA Exports and Trading,"60 Jalan Lam Huat #05-34 Carros Centre Singapore 737869",65148082,paulraj@paexports.com.sg,
49,Prime Car Rental & Taxi Services Pte Ltd,"5 Benoi Place Singapore 629926",67770666,alex@primecartraders.com.sg,67742608
50,Prime Motor & Leasing Pte Ltd,"5 Benoi Place Singapore 629926",67419292,nnh@primecar.com.sg,67461555
51,Prime Car Traders Pte Ltd,"61 UBI AVE 2 AUTOMOBILE MEGAMART #01-03 SINGAPORE 408898",67410050,henry@primecartraders.com.sg,67412092
52,Products I Need (P.I.N) Cars Pte Ltd,"1 Tampines North Drive 1 #03-20 T-Space Singapore 528559",62508096,pin_cars@yahoo.com,
53,Quan Feng Motors (S) Pte Ltd,"No 2 Sims Close #01-02 Gemini @ Sims Singapore 387298",67419549,andrew@quanfenggroup.com,67429549
54,Quantum Armour Pte Ltd,"33 Ubi Ave 3, #01-16 Vertex, Singapore 408868",67526555,maylaw@quantumarmour.com,67536555
55,Regent Express Pte Ltd,"33 Ubi Ave 3 Vertex #01-46 Singapore 408868",68440200,angeline@regent.express,
56,Republic Auto Pte Ltd,"301 Alexandra Road Mercedez-Benz Center Singapore 159968",68661702,edmund.ng@republicauto.com.sg,68661717
57,Ricardo Cars Pte Ltd,"Blk 160 Sin Ming Drive #02-02/03 Sin Ming AutoCity Singapore 575722",65156888,jeremy@ricardo.com.sg,64754666
58,Royal Motor Grandeur Pte Ltd,"61 Ubi Ave 2, #01-21 Automobile Megamart Singapore 408898",67414911,"stefan@royalmotorgrandeur.com.sg wholesale.rmg2pl@gmail.com",67416311
59,RZER PERFORMANCE PTE LTD,"60 Jalan Lam Huat, Carros Center, #03-50/51 SINGAPORE S737869",64448996,cityauto@live.com,
60,SCS PTE LTD,"180B BENCOOLEN STREET #12-05 The Bencoolen Singapore 189648",81008866,ryan.scspl@gmail.com,
61,SCT AUTO SERVICES PTE LTD,"60 Jalan Lam Huat #05-06/07 Carros Centre Singapore 737869",9060 4010,marcussoh@sct.com.sg,
62,SG Car Choice Pte Ltd,"3 Ang Mo Kio St 62 #01-13 LINK@AMK Singapore 569139",62649492,info@sgcarchoice.com,62649113
63,Shine Trust Trading Pte Ltd,"27 Transit Road #01-02 Forest Hills Singapore 778904",65533714 / 96378154,0164matsumoto@gmail.com,65533724
64,Sin Thai Hin Motor & Credit Pte Ltd,"128 Princep Street #02-01 Sin Thai Hin Building, Singapore 188655",63395511,jesimine@sth.com.sg,63385606
65,SkyLink Auto Pte Ltd,"1 Bukit Batok Crescent #08-03 WCEGA PLAZA Singapore 658064",84992356 / 84992166,wesley@skylink.com.sg / Johnson@skylink.com.sg,
66,Song Auto Pte Ltd,"39 Woodlands close, Mega @ Woodlands #01-27/28 Singapore 737856",62720080,songjie@songauto.biz,
67,Star Deals Gallery Pte Ltd,"159 Sin Ming Road  #01-05 AMTECH Building  Singapore 575625",64649697,rashidi@stardealsgallery.com,64648363
68,StarBright Auto Pte Ltd,"1 Bukit Batok Crescent #02-13/14 Wcega Plaza Singapore 658046",67930080,catherine@starbrightauto.com,67930800
69,Stockport Pte Ltd,"20 Sin Ming Lane  #03-61 Singapore 573968",83836957,stockportpteltd2016@gmail.com,
70,Sun Master Trading Co,"170 Upp Bukit Timah Road #05-05 Bt Timah Shopping Centre Singapore 588179",64672004,sunmaster@singnet.com.sg,64620300
71,Swee Seng Motors Pte Ltd,"21 Toh Guan Road East #01-01/02 Toh Guan Centre Singapore 608609",63663808,"kelvin.pohcy@ssgroup.sg tony.tanhx@ssgroup.sg",64633808
72,Tatco Enterprise,"250 Jalan Kayu Singapore 799475",64820153,francis@tatcogroup.com.sg,64811903
73,The Car Catalogue Pte Ltd,"53 Ubi Ave 3 #01-01 Singapore 408863",6958 6128,john.tiah@sgcartalog.com,
74,The Car Cycle Pte Ltd,"No 3 Jalan Tari Zapin Singapore 799050",81522220,daveling@thecarcycle.com.sg,
75,Think One Automobile & Trading Pte Ltd,"20 Ubi Road 4 Thinkone Building Singapore 408622",65453300,ntt@thinkone.com.sg,65433303/ 64679330
76,Tiong Choon Co Pte Ltd,"159 Sin Ming Road #01-07 Singapore 575625",63383600,tchoon22@pacific.net.sg,63372898
77,United Motoring Pte Ltd,"1 Bukit Batok Crescent Wcega Plaza #03-53 Singapore 658064",64635355,admin@unitedmotoringpl.com,64635455
78,Venture Cars Pte Ltd,"33 Ubi Ave 3 #02-42 Vertex Singapore 408868",62898800,enquiry@bw.com.sg,68582120
79,Vincar Pte Ltd,"24 Leng Kee Road #01-02 Leng Kee Autopoint Singapore 159096",67491119,vincenttan@vincar.com.sg,68421911 / 64791911
80,Vin's Auto Pte Ltd,"160 Sin Ming Drive Sin Ming Autocity #03-03 Singapore 575722",64532121,galvin@vinsautogroup.com.sg,64599795
81,William's Auto Pte Ltd,"280 Woodlands Industrial Park E5 #01-37 & 01-38 Harvest @ Woodlands Singapore 757322",67636811,waplsp21@singnet.com.sg,67632166
82,Yong Lee Seng Motor Pte Ltd,"61 Ubi Avenue 2 #03-05/06 Automobile Megamart Singapore 408898",68440123,shtang@singnet.com.sg,68441618
83,Yong Lei Logistics Pte Ltd,"2023 Bukit Batok Street 23 #01-100 Singapore 659528",65613268,henry.tan@yllogistics.com.sg,66651967
84,Zion Auto Gallery Pte Ltd,"159 Sin Ming Road #01-04 Amtech Building Singapore 575625",86995800 / 64525565,admin@zionauto.sg,64524535`;

  var members = [];
  var listEl = document.getElementById("directory-list");
  var countEl = document.getElementById("directory-count");
  var emptyEl = document.getElementById("directory-empty");
  var searchEl = document.getElementById("member-search");

  if (!listEl) return;

  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatPhone(phoneStr) {
    if (!phoneStr || phoneStr === '-') return '-';

    return phoneStr
      .split(/[\/\,\s]+/)
      .map(function (num) {
        const cleanNum = num.trim();
        if (!cleanNum) return '';
        return '<a href="tel:' + esc(cleanNum) + '">' + esc(cleanNum) + '</a>';
      })
      .filter(Boolean)
      .join(' / ');
  }

  function formatEmail(emailStr) {
    if (!emailStr || emailStr === '-' || emailStr.trim() === '') return '-';
  
    return emailStr
      .split(/[\s\/\,]+/)
      .map(function (email) {
        const cleanEmail = email.trim();
        if (!cleanEmail) return '';
        return '<div style="white-space: nowrap;"><a href="mailto:' + esc(cleanEmail) + '">' + esc(cleanEmail) + '</a></div>';
      })
      .filter(Boolean)
      .join('');
  }

  function renderDirectoryRow(m) {
    var tel = formatPhone(m.tel);
    var email = formatEmail(m.email);
    var fax = m.fax ? esc(m.fax) : '-';

    return (
      '<li class="directory-row">' +
        '<span class="col-no" data-label="No">' + esc(m.no) + "</span>" +
        '<span class="col-company" data-label="Company">' + esc(m.company) + "</span>" +
        '<span class="col-address" data-label="Address">' + esc(m.address) + "</span>" +
        '<span class="col-tel" data-label="Tel">' + tel + "</span>" +
        '<span class="col-email" data-label="Email">' + email + "</span>" +
        '<span class="col-fax" data-label="Fax">' + fax + "</span>" +
      "</li>"
    );
  }

  function render(list) {
    if (countEl) {
      countEl.textContent = list.length;
    }

    if (list.length === 0) {
      listEl.innerHTML = '';
      if (emptyEl) {
        emptyEl.style.display = 'block';
      } else {
        listEl.innerHTML = '<li class="directory-row no-results">No matching records found</li>';
      }
      return;
    }

    if (emptyEl) {
      emptyEl.style.display = 'none';
    }

    listEl.innerHTML = list.map(renderDirectoryRow).join('');
  }

  function parseCSV(csvText) {
    if (!csvText || !csvText.trim()) return [];

    var lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    function parseCSVLine(line) {
      var result = [];
      var current = '';
      var inQuotes = false;

      for (var i = 0; i < line.length; i++) {
        var char = line[i];

        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result.map(function (val) {
        return val.replace(/^"+|"+$/g, '').trim();
      });
    }

    var headers = parseCSVLine(lines[0]).map(function (h) {
      return h.toLowerCase();
    });

    return lines.slice(1).map(function (line) {
      if (!line.trim()) return null;
      var values = parseCSVLine(line);

      var rawObj = headers.reduce(function (acc, header, index) {
        acc[header] = values[index] ?? '';
        return acc;
      }, {});

      var m = {
        no: rawObj.no || '',
        company: rawObj.company || '',
        address: rawObj.address || '',
        tel: rawObj.tel || '',
        email: rawObj.email || '',
        fax: rawObj.fax || ''
      };

      m._hay = [m.no, m.company, m.address, m.tel, m.email, m.fax]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return m;
    }).filter(Boolean);
  }

  function initDirectory(rawCSV) {
    members = parseCSV(rawCSV);
    render(members);

    if (searchEl) {
      var t;
      searchEl.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () {
          var q = searchEl.value.trim().toLowerCase();
          if (!q) { 
            render(members); 
            return; 
          }

          var terms = q.split(/\s+/);
          var filtered = members.filter(function (m) {
            var haystack = m._hay || (
              (m.company || '') + ' ' + (m.address || '') + ' ' + (m.email || '')
            ).toLowerCase();

            return terms.every(function (term) {
              return haystack.indexOf(term) !== -1;
            });
          });

          render(filtered);
        }, 120);
      });
    }
  }

  initDirectory(csvData);
})();