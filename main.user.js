// ==UserScript==
// @name				Taipei Academy Protfolio Backup Tool
// @name:zh-TW	臺北市 學生學習歷程檔案系統 備份器
// @namespace		https://openuserjs.org/scripts/kevin_pan_940506
// @author			XiaoPanPanKevinPan
// @match				https://e-portfolio.cooc.tp.edu.tw/Index.do
// @grant				none
// @version			1.0.1
// @description A tool for backup files from Taipei's Academy Portfolio System.
// @description:zh-TW 從 臺北市 學生學習歷程檔案系統 備份檔案。
// @license			MIT
// @run-at			document-idle
// ==/UserScript==

"use strict";

(async ()=>{
	// an html file as the viewer of the whole backup
	const indexHtml =
		await fetch("data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPjxoZWFkPgoJPHRpdGxlPuWtuOe/kuatt+eoi+aqlOahiOWCmeS7vTwvdGl0bGU+Cgk8c2NyaXB0PgoJCWNvbnN0IG1ldGEgPSBSRVBMQUNFX1RISVNfV0lUSF9NRVRBX0pTT047Cgk8L3NjcmlwdD4KCTxzY3JpcHQ+CmNvbnN0IHFyeSA9ICguLi54KSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKC4uLngpLCBxcnlzID0gKC4uLngpID0+IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKC4uLngpXTsKZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsICgpID0+IHsKCWNvbnN0IG1haW4gPSBxcnkoIm1haW4iKTsKCW1haW4uaW5uZXJIVE1MID0gYAoJCTxidXR0b24+5YWo6YOo5bGV6ZaLPC9idXR0b24+PGJ1dHRvbj7lhajpg6jmlLblkIg8L2J1dHRvbj4KCWA7Cgl7CgkJY29uc3QgW29wZW5BbGwsIGNsb3NlQWxsXSA9IG1haW4uY2hpbGRyZW47CgkJb3BlbkFsbC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGUgPT4gcXJ5cygiZGV0YWlscyIpLmZvckVhY2goZCA9PiBkLm9wZW4gPSB0cnVlKSk7CgkJY2xvc2VBbGwuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBlID0+IHFyeXMoImRldGFpbHMiKS5mb3JFYWNoKGQgPT4gZC5vcGVuID0gZmFsc2UpKTsKCX0KCgkvLyBhbiBoYW5keSBmdW5jdGlvbiB0aGF0J2xsIGJlIHVzZWQgdHdpY2UgbGF0ZXIKCWNvbnN0IGZpZWxkVG9IVE1MID0gKFtuYW1lLCB2YWx1ZVNvdXJjZSwge2NsYXNzTmFtZSwgcmVwbGFjZVZhbHVlRWxlbWVudH0gPSB7fV0sIG8pID0+IHsKCQlsZXQgdmFsdWUgPSAiIjsKCQlpZih0eXBlb2YgdmFsdWVTb3VyY2UgPT0gImZ1bmN0aW9uIikgewoJCQl2YWx1ZSA9IHZhbHVlU291cmNlKG8pOwoJCX1lbHNlewoJCQl2YWx1ZSA9IGAke29bdmFsdWVTb3VyY2VdfWA7CgkJfQoJCWlmKHZhbHVlID09PSBmYWxzZSkgcmV0dXJuICIiOwoJCXJldHVybiBgCgkJCTxkaXYgY2xhc3M9IiR7Y2xhc3NOYW1lfSI+CgkJCQk8ZGl2PiR7bmFtZX08L2Rpdj4KCQkJCSR7IXJlcGxhY2VWYWx1ZUVsZW1lbnQgPyBgPGRpdj4ke3ZhbHVlfTwvZGl2PmA6IHZhbHVlfQoJCQk8L2Rpdj4KCQlgOwoJfTsKCgkvLyBwdXNoIGxlYXJuaW5nIG91dGNvbWVzIGludG8gdGhlIHdlYnBhZ2UKCWNvbnN0IG91dGNvbWVGaWVsZHMgPSBbCgkJLy8gW25hbWUsIHZhbHVlU291cmNlLCByZXBsYWNlVmFsdWVFbGVtZW50XQoJCS8vIHZhbHVlU291cmNlIGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcsIHdoaWNoIG1lYW5zIHRoZSBmaWVsZCBuYW1lLAoJCS8vIG9yIGJlIGEgZnVuY3Rpb24sIHdoaWNoIHRha2VzIGFuIGFyZ3VtZW50IHJlcHJlc2VudGluZyB0aGUgb3V0Y29tZQoJCS8vIGFuZCByZXR1cm5zIHRoZSByZXN1bHQgaHRtbCBjb2RlIG9yIGBmYWxzZWAgZm9yIG9taXR0aW5nIHRoZSBmaWVsZC4KCgkJWyLlrbjlubTluqYt5a245pyfIiwgbyA9PiBgJHtvLnN5ZWFyfS0ke28uc2VtZX1gXSwKCQlbIuenkeebriIsIG8gPT4KCQkJYDxkZXRhaWxzPgoJCQkJPHN1bW1hcnk+JHtvLnN1YmpDbmFtZX08aT4kewoJCQkJCW8uY291cnNlVHlwZSA9PSAiMiIJPyAi77yI6YeN5L+u77yJIgoJCQkJCTogby5jb3Vyc2VUeXBlID09ICIzIiA/ICLvvIjoo5zkv67vvIkiCgkJCQkJOiAiIgoJCQkJfSR7IG8ucmV2aXNlID09ICJZIgk/ICLvvIjoo5zku7bvvIkiIDogIiIgfTwvaT48L3N1bW1hcnk+CgkJCQnnp5Hnm67ku6PnorzvvI9zdWJqTm/vvJoke28uc3Viak5vfSA8YnIgLz4KCQkJCeiqsueoi+S7o+eivO+8j2NvdXJzZUlk77yaJHtvLmNvdXJzZUlkfQoJCQk8L2RldGFpbHM+YAoJCV0sCgkJWyLnp5Hnm67lrbjliIbvvI/mmYLmlbgiLCAiY3JlZGl0cyJdLAoJCVsi56eR55uu5oiQ57i+IiwgInNjb3JlIl0sCgkJWyLmjojoqrLmlZnluKsiLCBvID0+IG8uZW1wcy5yZXBsYWNlQWxsKCcsJywgJ+OAgScpXSwKCQlbIuS4iuWCs+aZgumWkyIsICJ1cGRUbSJdLAoJCVsi6YCB5Ye65pmC6ZaTIiwgInN1Ym1pdFRtIl0sCgkJWyLoqo3orYnni4DmhYsiLCBvID0+IAoJCQlgPGRldGFpbHM+CgkJCQk8c3VtbWFyeSBzdHlsZT0iY29sb3I6ICR7CgkJCQkJby52ZXJpZnlNID09ICIxIiA/ICJncmVlbiIKCQkJCQk6IG8udmVyaWZ5TSA9PSAiMiIgPyAicmVkIgoJCQkJCTogInJnYigxMjgsIDY0LCAwKSIKCQkJCX0iPiR7by52ZXJpZnlNVGV4dH08L3N1bW1hcnk+CgkJCQnoqo3orYnmmYLplpPvvJoke28udmVyaWZ5VG19PGJyIC8+CgkJCQnoqo3orYnmlZnluKvvvJoke28udmVtcHMucmVwbGFjZUFsbCgnLCcsICfjgIEnKX08YnIgLz4KCQkJCeipleiqnu+8j+WOn+WboO+8mjxwPiR7by52ZXJpZnlUeHQgfHwgYDxpPueEoTwvaT5gfTwvcD4KCQkJPC9kZXRhaWxzPmAKCQldLAoJCVsi5Yu+6YG46L2J5a2Y5Lit5aSu6LOH5paZ5bqrIiwgbyA9PiBgPGRldGFpbHM+CgkJCTxzdW1tYXJ5IHN0eWxlPSJjb2xvcjogJHtvLnVwbG9hZFluID09ICJZIiA/ICIjMDBGIjogIiNGMDAifTsgIj4ke28udXBsb2FkVGV4dH08L3N1bW1hcnk+CgkJCeS4iuasoeS/ruaUueWLvumBuOaZgumWk++8miR7by51cGxvYWRUbSB8fCAi54ShIn0KCQk8L2RldGFpbHM+YF0sCgkJWyLmiJDmnpznsKHov7AiLCBvID0+IGA8cD4ke28uYnJpZWZ9PC9wPmAsIHtjbGFzc05hbWU6ICJsb25nRmllbGQifV0sCgkJWyLmlofku7bmqpTmoYgiLCBvID0+IHsKCQkJaWYoIW8uZG4pIHJldHVybiAi54ShIjsKCQkJcmV0dXJuIGAKCQkJCTxkZXRhaWxzPgoJCQkJCTxzdW1tYXJ5PgoJCQkJCQnmqpTmoYjljp/lkI3vvJo8Y29kZT4ke28uZG59PC9jb2RlPiA8YnV0dG9uIAoJCQkJCQkJY2xhc3M9InByZXZpZXciCgkJCQkJCQlkYXRhLWZpbGVuYW1lPSIke28uZG59IgoJCQkJCQkJZGF0YS1wYXRoPSIke28uZG9jWmlwUGF0aH0iCgkJCQkJCT7lmJfoqabpoJDopr08L2J1dHRvbj48YnIgLz4KCQkJCQkJ5Zyo5YKZ5Lu95qqU5Lit5L2N572u77yaPGNvZGU+JHtvLmRvY1ppcFBhdGh9PC9jb2RlPgoJCQkJCTwvc3VtbWFyeT4KCQkJCQlNRDUg5a6M5pW05oCn5qCh6amX56K877yaPGNvZGU+JHtvLmRvY01kNX08L2NvZGU+PGJyIC8+CgkJCQkJ57O757Wx5LitIHV1aWTvvJo8Y29kZT4ke28uZHV9PC9jb2RlPjxiciAvPgoJCQkJPC9kZXRhaWxzPgoJCQlgICsgKCFvLmRuX29sZCA/ICIiIDogYAoJCQkJPGJyIC8+CgkJCQnoiIrmqpTljp/lkI3vvJo8Y29kZT4ke28uZG5fb2xkfTwvY29kZT4gPGJ1dHRvbgoJCQkJCWNsYXNzPSJwcmV2aWV3IgoJCQkJCWRhdGEtZmlsZW5hbWU9IiR7by5kbl9vbGR9IgoJCQkJCWRhdGEtcGF0aD0iJHtvLmRvY09sZFppcFBhdGh9IgoJCQkJPuWYl+ippumgkOimvTwvYnV0dG9uPjxiciAvPgoJCQkJ5Zyo5YKZ5Lu95qqU5Lit5L2N572u77yaPGNvZGU+JHtvLmRvY09sZFppcFBhdGh9PC9jb2RlPgoJCQlgKQoJCX0sIHtjbGFzc05hbWU6ICJsb25nRmllbGQifV0sCgkJWyLlvbHpn7PmqpTmoYgiLCBvID0+IHsKCQkJaWYoIW8ubW4pIHJldHVybiAi54ShIjsKCQkJcmV0dXJuIGAKCQkJCTxkZXRhaWxzPgoJCQkJCTxzdW1tYXJ5PgoJCQkJCQnmqpTmoYjljp/lkI3vvJo8Y29kZT4ke28ubW59PC9jb2RlPiA8YnV0dG9uIAoJCQkJCQkJY2xhc3M9InByZXZpZXciCgkJCQkJCQlkYXRhLWZpbGVuYW1lPSIke28ubW59IgoJCQkJCQkJZGF0YS1wYXRoPSIke28ubWVkaWFaaXBQYXRofSIKCQkJCQkJPuWYl+ippumgkOimvTwvYnV0dG9uPjxiciAvPgoJCQkJCQnlnKjlgpnku73mqpTkuK3kvY3nva7vvJo8Y29kZT4ke28ubWVkaWFaaXBQYXRofTwvY29kZT4KCQkJCQk8L3N1bW1hcnk+CgkJCQkJTUQ1IOWujOaVtOaAp+agoempl+eivO+8mjxjb2RlPiR7by5tZWRpYU1kNX08L2NvZGU+PGJyIC8+CgkJCQkJ57O757Wx5LitIHV1aWTvvJo8Y29kZT4ke28ubXV9PC9jb2RlPjxiciAvPgoJCQkJPC9kZXRhaWxzPgoJCQlgICsgKCFvLm1uX29sZCA/ICIiIDogYAoJCQkJPGJyIC8+CgkJCQnoiIrmqpTljp/lkI3vvJo8Y29kZT4ke28ubW5fb2xkfTwvY29kZT4gPGJ1dHRvbgoJCQkJCWNsYXNzPSJwcmV2aWV3IgoJCQkJCWRhdGEtZmlsZW5hbWU9IiR7by5tbl9vbGR9IgoJCQkJCWRhdGEtcGF0aD0iJHtvLm1lZGlhT2xkWmlwUGF0aH0iCgkJCQk+5ZiX6Kmm6aCQ6Ka9PC9idXR0b24+PGJyIC8+CgkJCQnlnKjlgpnku73mqpTkuK3kvY3nva7vvJo8Y29kZT4ke28ubWVkaWFPbGRaaXBQYXRofTwvY29kZT4KCQkJYCkKCQl9LCB7Y2xhc3NOYW1lOiAibG9uZ0ZpZWxkIn1dLAoJCVsi5YW25LuW6KiK5oGvIiwgbyA9PiB7CgkJCWxldCB0YWdzID0gIiI7CgkJCXRhZ3MgKz0gby5hYmlsID8gYOaguOW/g+e0oOmkiu+8miR7by5hYmlsfWAgOiAiIjsKCQkJdGFncyArPSB0YWdzID8gIjxiciAvPiIgOiAiIjsKCQkJdGFncyArPSBvLm11bHQgPyBg5aSa5YWD5pm66IO977yaJHtvLm11bHR9YCA6ICIiOwoJCQl0YWdzICs9IHRhZ3MgPyAiPGJyIC8+IiA6ICIiOwoJCQl0YWdzICs9IG8uZ3JvdXAgPyBg5a24576k5o6i57Si77yaJHtvLmdyb3VwfWAgOiAiIjsKCQkJcmV0dXJuIGA8ZGV0YWlscz48c3VtbWFyeT7oqbPntLDos4fmlpk8L3N1bW1hcnk+CgkJCQnkuIrlgrPku6PnorzvvJoke28udXBkSWR9PGJyIC8+CgkJCQlpbnNlcnRTeXNl77yaJHtvLmluc2VydFN5c2V9PGJyIC8+CgkJCQlpbnNUbe+8miR7by5pbnNUbX08YnIgLz4KCQkJCWluc0lk77yaJHtvLmluc0lkfQoJCQkJJHt0YWdzID8gIjxiciAvPjxociAvPjxiciAvPiIgKyB0YWdzIDogIiJ9CgkJCTwvZGV0YWlscz5gCgkJfSwge2NsYXNzTmFtZTogImxvbmdGaWVsZCJ9XQoJXTsKCgltZXRhLmxlYXJuaW5nT3V0Y29tZXMucmV2ZXJzZSgpLmZvckVhY2gobyA9PiB7IC8vIG8gZm9yIG91dGNvbWUKCQlsZXQgb3V0Y29tZUh0bWwgPSAiIjsKCQlvdXRjb21lRmllbGRzLmZvckVhY2goZmllbGQgPT4gb3V0Y29tZUh0bWwgKz0gZmllbGRUb0hUTUwoZmllbGQsIG8pKTsKCQltYWluLmluc2VydEFkamFjZW50SFRNTChgYmVmb3JlZW5kYCwgYAoJCQk8c2VjdGlvbj4KCQkJCTxoMj7lrbjnv5LmiJDmnpwgPGNvZGU+IyR7by5pZH08L2NvZGU+PC9oMj4KCQkJCTxkaXYgY2xhc3M9Im91dGNvbWUgZmllbGRzIj4ke291dGNvbWVIdG1sfTwvZGl2PgoJCQk8L3NlY3Rpb24+CgkJYCk7Cgl9KTsKCgkvLyBwdXNoIGRpdmVyc2UgcGVyZm9ybWFuY2VzIGludG8gd2VicGFnZQoJY29uc3QgcGVyZm9ybWFuY2VGaWVsZHMgPSB7CgkJIjEiOiBbWyLllq7kvY3lkI3nqLEiLCAidW5pdCJdLCBbIumWi+Wni+aXpeacnyIsICJiZWdpbkR0Il0sIFsi57WQ5p2f5pel5pyfIiwgImVuZER0Il0sIFsi5pOU5Lu76IG35YuZIiwgInRpdGxlIl0sIFsi5bm56YOo562J57SaIiwgImtpbmQiXV0sCgkJIjIiOiBbWyLnq7bos73lkI3nqLEiLCAiY29tcGV0aXRpb25OYW1lIl0sIFsi56u26LO9562J57SaIiwgImxldmVsIl0sIFsi542O6aCFIiwgImF3YXJkIl0sIFsi5YWs5biD5pel5pyfIiwgImFubm91bmNlbWVudER0Il0sIFsi5Y+D6IiH6aGe5Z6LIiwgImdyb3VwTSJdXSwKCQkiMyI6IFtbIuitieeFp+Wtl+iZnyIsICJjZXJ0Tm8iXSwgWyLorYnnhaflgpnoqLsiLCAia2luZCJdLCBbIuWIhuaVuCIsICJzY29yZSJdLCBbIuWIhumghee1kOaenCIsICJyZXN1bHQiXSwgWyLlj5blvpforYnnhafml6XmnJ8iLCAib2J0YWluRHQiXV0sCgkJIjQiOiBbWyLmnI3li5nlkI3nqLEiLCAic2Vydk5hbWUiXSwgWyLmnI3li5nllq7kvY0iLCAic2VydlVuaXQiXSwgWyLplovlp4vml6XmnJ8iLCAiYmVnaW5EdCJdLCBbIue1kOadn+aXpeacnyIsICJlbmREdCJdLCBbIuaZguaVuCIsICJob3VycyJdXSwgCgkJIjUiOiBbWyLpoZ7liKUiLCAia2luZCJdLCBbIumWi+ioreWQjeeosSIsICJvcGVuTmFtZSJdLCBbIumWi+ioreWWruS9jSIsICJ1bml0Il0sIFsi5q+P6YCx56+A5pW4IiwgInNlY3MiXSwgWyLplovoqK3pgLHmlbgiLCAid2Vla3MiXV0sCgkJIjYiOiBbWyLlkI3nqLEiLCAid29ya3NOYW1lIl0sIFsi5pel5pyfIiwgIndvcmtzRHQiXV0sCgkJIjciOiBbWyLlkI3nqLEiLCAiYWN0TmFtZSJdLCBbIuS4u+i+puWWruS9jSIsICJ1bml0Il0sIFsi6ZaL5aeL5pel5pyfIiwgImJlZ2luRHQiXSwgWyLntZDmnZ/ml6XmnJ8iLCAiZW5kRHQiXSwgWyLmmYLmlbgiLCAiaG91cnMiXV0sCgkJIjgiOiBbWyLpoZ7liKUiLCAia2luZCJdLCBbIuWWruS9jSIsICJ1bml0Il0sIFsi6IG356ixIiwgInRpdGxlIl0sIFsi6ZaL5aeL5pel5pyfIiwgImJlZ2luRHQiXSwgWyLntZDmnZ/ml6XmnJ8iLCAiZW5kRHQiXV0sCgkJIjkiOiBbWyLmmYLplpPpoZ7liKUiLCAidGltZUtpbmQiXSwgWyLlhaflrrnlkI3nqLEiLCAib3Blbk5hbWUiXSwgWyLmmYLmlbgiLCAiaG91cnMiXV0sCgkJIjEwIjogW1si6ZaL6Kit5Zau5L2NIiwgInVuaXQiXSwgWyLoqrLnqIvlkI3nqLEiLCAib3Blbk5hbWUiXSwgWyLplovlp4vml6XmnJ8iLCAiYmVnaW5EdCJdLCBbIue1kOadn+aXpeacnyIsICJlbmREdCJdLCBbIuWtuOWIhuaVuCIsICJjcmVkaXRzIl0sIFsi57i95pmC5pW4IiwgImhvdXJzIl1dCgl9OwoJT2JqZWN0LmtleXMocGVyZm9ybWFuY2VGaWVsZHMpLmZvckVhY2goa2V5ID0+IHsKCQljb25zdCBzZW1lID0gWyLlrbjmnJ8t5a245bm05bqmIiwgcCA9PiBgJHtwLnN5ZWFyfS0ke3Auc2VtZX1gXTsKCQljb25zdCBjaGVjayA9IFsi5Yu+6YG46L2J5a2Y5Lit5aSu6LOH5paZ5bqrIiwgcCA9PiBgPGRldGFpbHM+CgkJCTxzdW1tYXJ5PiR7cC51cGxvYWRUZXh0LnJlcGxhY2UoLzxiciA/XC8/Pi9nLCAiIil9PC9zdW1tYXJ5PgoJCQnkuIrmrKHkv67mlLnli77pgbjmmYLplpPvvJoke3AudXBsb2FkVG19CgkJPC9kZXRhaWxzPmBdOwoJCWNvbnN0IGJyaWVmID0gWyLlhaflrrnnsKHov7AiLCBwID0+IGA8cD4ke3AuYnJpZWZ9PC9wPmAsIHtjbGFzc05hbWU6ICJsb25nRmllbGQifV07CgkJY29uc3QgZmlsZSA9IFsKCQkJa2V5ID09ICI1IiAvKiDlvYjmgKflrbjnv5IgKi8gPyAi5L2c5ZOB5oiQ5p6cIiA6ICLorYnmmI7mlofku7YiLAoJCQlwID0+ICFwLmNlcnRpRmlsZW5hbWUgPyAi54ShIiA6IGA8ZGV0YWlscz4KCQkJCTxzdW1tYXJ5PgoJCQkJCeWOn+aqlOWQjeeose+8mjxjb2RlPiR7cC5jZXJ0aUZpbGVuYW1lfTwvY29kZT4gPGJ1dHRvbgoJCQkJCQljbGFzcz0icHJldmlldyIKCQkJCQkJZGF0YS1maWxlbmFtZT0iJHtwLmNlcnRpRmlsZW5hbWV9IgoJCQkJCQlkYXRhLXBhdGg9IiR7cC5jZXJ0aVppcFBhdGh9IgoJCQkJCT7lmJfoqabpoJDopr08L2J1dHRvbj48YnIgLz4KCQkJCQnlnKjlgpnku73mqpTkuK3kvY3nva7vvJo8Y29kZT4ke3AuY2VydGlaaXBQYXRofTwvY29kZT4KCQkJCTwvc3VtbWFyeT4KCQkJCU1ENSDlrozmlbTmgKfmoKHpqZfnorzvvJo8Y29kZT4ke3AuY2VydGlNZDV9PC9jb2RlPjxiciAvPgoJCQkJ57O757Wx5LitIHV1aWTvvJo8Y29kZT4ke3AuY2VydGlGaWxlfTwvY29kZT4KCQkJPC9kZXRhaWxzPmAsCgkJCXtjbGFzc05hbWU6ICJsb25nRmllbGQifQoJCV07CgkJY29uc3QgbWVkaWEgPSBbCgkJCSLlqpLpq5Tmlofku7YiLAoJCQlwID0+ICFwLm1lZGlhRmlsZW5hbWUgPyBmYWxzZSA6IGA8ZGV0YWlscz4KCQkJCTxzdW1tYXJ5PgoJCQkJCeWOn+aqlOWQjeeose+8mjxjb2RlPiR7cC5tZWRpYUZpbGVuYW1lfTwvY29kZT4gPGJ1dHRvbgoJCQkJCQljbGFzcz0icHJldmlldyIKCQkJCQkJZGF0YS1maWxlbmFtZT0iJHtwLm1lZGlhRmlsZW5hbWV9IgoJCQkJCQlkYXRhLXBhdGg9IiR7cC5tZWRpYVppcFBhdGh9IgoJCQkJCT7lmJfoqabpoJDopr08L2J1dHRvbj48YnIgLz4KCQkJCQnlnKjlgpnku73mqpTkuK3kvY3nva7vvJo8Y29kZT4ke3AubWVkaWFaaXBQYXRofTwvY29kZT4KCQkJCTwvc3VtbWFyeT4KCQkJCU1ENSDlrozmlbTmgKfmoKHpqZfnorzvvJo8Y29kZT4ke3AubWVkaWFNZDV9PC9jb2RlPjxiciAvPgoJCQkJ57O757Wx5LitIHV1aWTvvJo8Y29kZT4ke3AubWVkaWFGaWxlfTwvY29kZT4KCQkJPC9kZXRhaWxzPmAsIAoJCQl7Y2xhc3NOYW1lOiAibG9uZ0ZpZWxkIn0KCQldOwoJCXBlcmZvcm1hbmNlRmllbGRzW2tleV0uc3BsaWNlKDAsIDAsIHNlbWUpOwoJCXBlcmZvcm1hbmNlRmllbGRzW2tleV0ucHVzaChjaGVjaywgYnJpZWYsIGZpbGUsIG1lZGlhKTsKCX0pOwoKCWNvbnN0IHBlcmZvcm1hbmNlQ2F0ZWdvcmllcyA9IHsKCQkiMSI6ICLlubnpg6jntpPmrbciLCAiMiI6ICLnq7bos73lj4PoiIciLCAiMyI6ICLmqqLlrprorYnnhaciLCAiNCI6ICLlv5flt6XmnI3li5kiLCAiNSI6ICLlvYjmgKflrbjnv5IiLAoJCSI2IjogIuS9nOWTgeaIkOaenCIsICI3IjogIuWFtuS7lua0u+WLlSIsICI4IjogIuiBt+WgtOWtuOe/kiIsICI5IjogIuWcmOmrlOa0u+WLlSIsICIxMCI6ICLlhYjkv67oqrLnqIsiCgl9OwoKCU9iamVjdC5lbnRyaWVzKHBlcmZvcm1hbmNlQ2F0ZWdvcmllcykuZm9yRWFjaCgoW251bSwgdGl0bGVdKSA9PiB7CgkJbGV0IHBlcmZvcm1hbmNlQ2F0ZWdvcnlIdG1sID0gIiI7CgkJbWV0YS5kaXZlcnNlUGVyZm9ybWFuY2VzW251bV0uZGF0YVJvd3MuZm9yRWFjaChwID0+IHsKCQkJbGV0IHBlcmZvcm1hbmNlSHRtbCA9ICIiCgkJCXBlcmZvcm1hbmNlRmllbGRzW251bV0uZm9yRWFjaChmaWVsZCA9PiBwZXJmb3JtYW5jZUh0bWwgKz0gZmllbGRUb0hUTUwoZmllbGQsIHApKTsKCQkJcGVyZm9ybWFuY2VDYXRlZ29yeUh0bWwgKz0gYAoJCQkJPHNlY3Rpb24+CgkJCQkJPGgzPuWkmuWFg+ihqOePviA8Y29kZT4jJHtwLmlkfTwvY29kZT48L2gzPgoJCQkJCTxkaXYgY2xhc3M9InBlcmZvcm1hbmNlcyBmaWVsZHMiPiR7cGVyZm9ybWFuY2VIdG1sfTwvZGl2PgoJCQkJPC9zZWN0aW9uPgoJCQlgOwoJCX0pOwoJCW1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKCJiZWZvcmVlbmQiLCBgPHNlY3Rpb24+CgkJCTxoMj4ke3RpdGxlfTwvaDI+CgkJCTxkaXY+CgkJCQkke3BlcmZvcm1hbmNlQ2F0ZWdvcnlIdG1sIHx8IGDnhKEke3RpdGxlfeiomOmMhGB9CgkJCTwvZGl2PgoJCTwvc2VjdGlvbj5gKTsKCX0pOwoKCWNvbnN0IFtwcmV2aWV3LCBjbG9zZVByZXZpZXddID0gKCgpID0+IHsKCQltYWluLmluc2VydEFkamFjZW50SFRNTCgiYmVmb3JlZW5kIiwgYDxkaWFsb2cgaWQ9InByZXZpZXciPjwvZGlhbG9nPmApOwoJCWNvbnN0IGRpYWxvZyA9IHFyeSgiZGlhbG9nI3ByZXZpZXciKTsKCgkJZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoImNsb3NlIiwgZSA9PiBkaWFsb2cuaW5uZXJIVE1MID0gIiIpOwoKCQljb25zdCBjbG9zZSA9ICgpID0+IGRpYWxvZy5jbG9zZSgpOwoKCQljb25zdCBzdGFydCA9IChmaWxlbmFtZSwgcGF0aCkgPT4gewoJCQlkaWFsb2cuc2hvd01vZGFsKCk7CgkJCWRpYWxvZy5pbm5lckhUTUwgPSBgCgkJCQk8ZGl2PgoJCQkJCTxkaXY+5qqU5qGI5ZCN56ix77yaPGNvZGU+JHtmaWxlbmFtZX08L2NvZGU+PC9kaXY+CgkJCQkJPGJ1dHRvbj7pl5zplonmqqLoppbvvIhFU0PvvIk8L2J1dHRvbj4KCQkJCTwvZGl2PgoJCQkJPG9iamVjdCBkYXRhPSIuLyR7cGF0aH0iPjxkaXY+CgkJCQkJ5b6I5oqx5q2J77yM5oKo55qE54CP6Ka95Zmo5Lim5LiN5pSv5o+06YCZ5YCL5qqU5qGI55qE5qqi6KaW44CCCgkJCQkJ6KuL5omL5YuV6ZaL5ZWf5L2N5pa85YKZ5Lu95qqU5Lit77yMPGNvZGU+JHtwYXRofTwvY29kZT7nmoTmqpTmoYgKCQkJCTwvZGl2Pjwvb2JqZWN0PgoJCQlgOwoJCQlbe2NoaWxkcmVuOiBbZmlsZW5hbWVEaXYsIGNsb3NlQnV0dG9uXX0sIHByZXZpZXdPYmplY3RdID0gZGlhbG9nLmNoaWxkcmVuOwoJCQljbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGNsb3NlKTsKCQkJcHJldmlld09iamVjdC5mb2N1cygpOwoJCX07CgkJcmV0dXJuIFtzdGFydCwgY2xvc2VdOwoJfSkoKTsKCglxcnlzKCJidXR0b24ucHJldmlldyIpLmZvckVhY2goYiA9PiBiLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgZSA9PiB7CgkJcHJldmlldyhiLmRhdGFzZXRbImZpbGVuYW1lIl0sIGIuZGF0YXNldFsicGF0aCJdKTsKCX0pKTsKfSk7Cgk8L3NjcmlwdD4KCTxzdHlsZT4KKiB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9CgpodG1sIHsKCWZvbnQtc2l6ZTogMTZweDsKCWZvbnQtZmFtaWx5OiAiTm90byBTYW5zIFRDIiwgc2Fucy1zZXJpZjsKCWxpbmUtaGVpZ2h0OiAxLjU7Cn0KCmNvZGUgewoJZm9udC1zaXplOiAwLjhlbTsKCXBhZGRpbmc6IDAgMC4xZW07Cglib3JkZXItYm90dG9tOiBzb2xpZCBibGFjayAwLjA2MjVweDsKfQoKLmZpZWxkcyB7CglkaXNwbGF5OiBncmlkOwoJZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDFmcjsKCWdhcDogMC41ZW07Cn0KLmZpZWxkcyA+ICogewoJZGlzcGxheTogY29udGVudHM7CglnYXA6IDAuNWVtOwp9CgpAbWVkaWEgKG1pbi13aWR0aDogNTByZW0pIHsKCS5maWVsZHMgewoJCWdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byAxZnIgYXV0byAxZnI7Cgl9CgoJLmxvbmdGaWVsZCA+IDpmaXJzdC1jaGlsZCB7CgkJZ3JpZC1jb2x1bW46IDE7Cgl9CgoJLmxvbmdGaWVsZCA+IDpudGgtY2hpbGQoMikgewoJCWdyaWQtY29sdW1uOiAyIC8gc3BhbiAzOwoJfQp9CgouZmllbGRzID4gKiA+ICogewoJYWxpZ24tc2VsZjogY2VudGVyOwp9CgouZmllbGRzID4gKiA+IDpudGgtY2hpbGQoMikgewoJbWFyZ2luLXJpZ2h0OiAwLjVlbTsKfQoKLmZpZWxkcyA+ICogPiA6Zmlyc3QtY2hpbGQgewoJdGV4dC1hbGlnbjogcmlnaHQ7Cn0KCi5maWVsZHMgcCB7CgliYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7CglwYWRkaW5nOiAwLjVlbTsKCW1hcmdpbjogMDsKCWJvcmRlci1yYWRpdXM6IDAuNWVtOwp9CgpkaWFsb2c6OmJhY2tkcm9wIHsKCWJhY2tkcm9wLWZpbHRlcjogYmx1cigwLjA2MjVyZW0pOwoJYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNSk7Cn0KCmRpYWxvZyNwcmV2aWV3W29wZW5dIHsKCXdpZHRoOiBjYWxjKDEwMHZ3IC0gMnJlbSk7CgloZWlnaHQ6IGNhbGMoMTAwdmggLSAycmVtKTsKCglkaXNwbGF5OiBmbGV4OwoJZmxleC1mbG93OiBjb2x1bW4gbm93cmFwOwoJcGFkZGluZzogMDsKfQoKZGlhbG9nI3ByZXZpZXcgPiBkaXY6Zmlyc3QtY2hpbGQgewoJZmxleDogMCAwOwoJZGlzcGxheTogZmxleDsKfQoKZGlhbG9nI3ByZXZpZXcgPiBkaXY6Zmlyc3QtY2hpbGQgPiBkaXY6Zmlyc3QtY2hpbGQgewoJZmxleDogMTsKCXBhZGRpbmc6IDAuNWVtOwp9CgpkaWFsb2cjcHJldmlldyA+IGRpdjpmaXJzdC1jaGlsZCA+IGJ1dHRvbjpudGgtY2hpbGQoMikgewoJZmxleDogMCAwOwoJYm9yZGVyLXJhZGl1czogMDsKCXdoaXRlLXNwYWNlOiBub3dyYXA7Cn0KCmRpYWxvZyNwcmV2aWV3ID4gb2JqZWN0Om50aC1jaGlsZCgyKSB7CgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsKCWZsZXg6IDE7Cn0KCTwvc3R5bGU+CjwvaGVhZD48Ym9keT4KCTxzZWN0aW9uIGFyaWEtbGFiZWw9IuacrOaqlOahiOS7i+e0uSI+CgkJPGgxPuWtuOe/kuatt+eoi+aqlOahiOWCmeS7vTwvaDE+CgkJPHA+CgkJ5pys5qqU5qGI5piv5oKo55qE5a2457+S5q2356iL5qqU5qGI5YKZ5Lu977yM5Y+v5L6b6Zui57ea5qqi6KaW44CCPGJyIC8+CgkJPGJyIC8+CgkJ5oKo5Y+v5Lul6bue5pOK5q+P5YCL5qqU5qGI55qE44CM5ZiX6Kmm6aCQ6Ka944CN5oyJ6YiV77yM6Kmm5ZyW5Zyo54CP6Ka95Zmo5Lit5qqi6KaW6Kmy5qqU5qGI44CC6Iul5piv54CP6Ka95Zmo5LiN5pSv5o+077yM5oKo5Lmf5LiN5aao55u05o6l5Zyo6LOH5paZ5aS+5Lit5om+5Yiw6Kmy5qqU5qGI77yM5Lim5LiU6ZaL5ZWf44CCCgkJCTxub3NjcmlwdD4KCQkJCeaKseatie+8jOaCqOeahOeAj+imveWZqOS4puS4jeaUr+aPtCBKYXZhc2NyaXB044CC5LiN6YGO5Yil5pOU5b+D77yM6LOH5paZ5bey57aT5a6M5pW055WZ5Zyo5pys5qqU5qGI5Lit5LqG44CC5oKo5Y+v5Lul6YCP6YGO5YW25LuW54CP6Ka95Zmo6Zui57ea5qqi6KaW44CCCgkJCTwvbm9zY3JpcHQ+CgkJPC9wPgoJPC9zZWN0aW9uPgoJPG1haW4+CgkJ6KuL56iN5b6F77yM5pys5qqU5qGI5q2j55Sx5oKo55qE54CP6Ka95Zmo5riy5p+T5oiQ5pa55L6/5qqi6KaW55qE6KGo5qC844CCCgk8L21haW4+CjwvYm9keT48L2h0bWw+Cg==")
		.then(res => res.text());
		// later, replace "REPLACE_THIS_WITH_META_JSON" with JSON.stringify(meta)
		// and save it as index.html in zip

	// create a div for the app; use shadowDom to prevent unexpected styles
	const backupDiv = (() => {
		const tmp = document.createElement("div");
		document.body.appendChild(tmp);
		tmp.setAttribute("style", `
			position: fixed;
			bottom: 0;
			left: 2em;

			z-index: 2;

			width: calc(100vw - 4em);
			height: 2em;
		`);

		return tmp.attachShadow({mode: "open"});
	})();

	// setup the app
	backupDiv.innerHTML = `
		<button id="openUi">開啟備份界面<span id="outerStatus"></span></button>
		<dialog id="ui">
			<ul id="log"></ul>
			<div id="status"></div>
			<div id="controls">
				<button>關閉備份界面</button>
				<button disabled="">下載</button>
				<button class="safe">開始備份</button>
				<button class="dangerous" style="display: none;">終止備份</button>
			</div>
		</dialog>
		<style>
			* {
				box-sizing: border-box;
			}

			button {
				color: black;
				font-size: inherit;
				border: solid 0.25em black;
			}

			button.safe {
				color: green;
				border: solid 0.25em limegreen;
			}

			button.dangerous {
				color: red;
				border: solid 0.25em red;
			}

			#outerStatus::before {
				content: "：";
			}

			#openUi {
				border-color: limegreen;
				border-bottom: none;

				width: 100%;
				height: 100%;

				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			#ui:modal {
				display: flex;
				flex-flow: column nowrap;
				width: calc(100vw - 2em);
				height: calc(100vh - 2em);

				align-content: stretch;
				gap: 0.5em;
			}

			#log {
				flex: 1;
				background-color: lightgray;
				margin: 0;
				padding: 0.5em;
				padding-left: 1.5em;
				overflow: auto;

				word-wrap: anywhere;
				word-break: break-all;
			}

			#log > li::marker {
				content: '- ';
			}

			#status {
				flex: 0;
				background-color: lightgray;
				padding: 0.5em;
			}

			#controls {
				display: flex;
				flex-flow: row wrap;
				align-content: stretch;

				flex: 0;
			}

			#controls > * {
				flex: 1;
			}

			:disabled {
				filter: contrast(25%);
			}
		</style>
	`;

	// name the elements for easier interaction
	const [openUiBtn, backupDialog] = backupDiv.children;
	const [outerStatusSpan] = openUiBtn.children;
	const [
		logUl,
		statusDiv,
		{children: [closeUiBtn, downloadBtn, startBackupBtn, abortBackupBtn]}
	] = backupDialog.children;

	// handy function to log the process
	const log = (message = "", style = "") => {
		let atTheEnd = logUl.scrollTopMax - logUl.scrollTop < 32;
		logUl.insertAdjacentHTML("beforeend", `<li style="${style}">${message}</li>`);
		if(atTheEnd) logUl.scrollTop = logUl.scrollTopMax;
	}

	const status = (message = "", style = "") => {
		outerStatusSpan.innerHTML = statusDiv.innerHTML = message;
		outerStatusSpan.setAttribute("style", style);
		statusDiv.setAttribute("style", style);
	}

	const logStatus = (message, style) => {
		log(message, style);
		status(message, style);
	}

	// open modal and prepare for backup if openUiBtn clicked
	openUiBtn.addEventListener("click", e => backupDialog.showModal());

	// close modal if closeUiBtn clicked
	closeUiBtn.addEventListener("click", e => backupDialog.close());

	let fileUri = "", backupEndedTime;
		// fileUri: a uri (maybe data uri) that'll be generated later
		// backupEndedTime: a Date() Object that'll be generated later
	downloadBtn.addEventListener("click", e => {
		if(!fileUri)
			return log("錯誤！下載連結不存在。", "color: red;");

		let tmpA = document.createElement("a");
		backupDialog.appendChild(tmpA);
		tmpA.href = fileUri;
		tmpA.download = `academyPortfolioBackup_${backupEndedTime.toISOString().replace(/[:\.]/g, '-')}.zip`;
		tmpA.click();
		tmpA.remove();
	});

	startBackupBtn.addEventListener("click", async e => {
		startBackupBtn.style["display"] = "none";
		abortBackupBtn.style["display"] = "";

		let currentProcess = new AbortController();
		currentProcess.signal.addEventListener("abort", e => {
			startBackupBtn.style["display"] = "";
			abortBackupBtn.style["display"] = "none";
		}, {once: true});

		abortBackupBtn.addEventListener("click", e => {
			logStatus("使用者已終止備份程序。", "color: red;");
			currentProcess.abort(new DOMException("使用者已終止備份程序", "userAborted"));
		}, {once: true});

		logStatus("正在執行備份程序……");

		logStatus("正在匯入 JSZip 函式庫……");
		const JsZip = (await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm")).default;
			// jsdelivr: https://www.jsdelivr.com/package/npm/jszip
			// official: https://stuk.github.io/jszip/
			// License: MIT License (~= CC0) or GPL v3

		let filesToDownload = [];
			// an array of Promise for { path, data }

		const session_key = $.session_key;
		logStatus(`
			已取得本次會話的代碼（session_key）：<code>${session_key}</code>。
			接下來將透過此代碼與伺服器溝通。
		`);

		let meta = {
				learningOutcomes: [],
				diversePerformances: {},
				backupStartedTime: `${new Date().getTime()}`,
				backupEndedTime: ""
		}; // this will be used to create metaJson

		{ // -- START OF 學習成果 --
			logStatus("正在從伺服器取得學習成果……");

			// get json by page number
			const getJson = async (page) => (
				await fetch(`${location.origin}/courseEditQuery.do`, {
					method: "POST",
					headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					body: new URLSearchParams({
						page: `${page}`,
						/*k: "uc",*/
						syear: "",
						seme: "",
						subj: "",
						session_key: session_key
					}).toString(),
					signal: currentProcess.signal
				}).then(res => res.json())
				.catch(err => {
					if(err.name == "userAborted") return;
					logStatus(`錯誤！在取得學習成果時發生問題。`, "color: red");
					console.log(`錯誤！在取得學習成果時發生問題。`, err);
				})
			);

			// get the rows of data by parsing jsons
			let dataRows = [];
			for(let page = 1; true; page++) {
				let json = await getJson(page);
				if(currentProcess.signal.aborted) return;

				json.dataRows.forEach(row => dataRows.push(row));

				if(page < json.total)
					continue;

				if(json.records != dataRows.length) {
					log(`
						潛在的錯誤：僅從伺服器取得 ${dataRows.length} 筆學習成果，
						但伺服器卻表示有 ${json.records} 筆成果。可能有資料發生遺失，請在備份後手動檢查。
					`, "color: red");
					status("發現潛在的錯誤：學習成果筆數不符。", "color: red");
				} else {
					logStatus(`
						已成功從伺服器取得 ${dataRows.length} 筆學習成果。
					`);
				}

				log(`<details><summary>取得的學習成果</summary>${JSON.stringify(dataRows)}</details>`);

				break;
			}

			logStatus("正在開始下載檔案……");

			// start download files
			/*const randomText =
				() => Math.round((Math.random() * 0x111111111)).toString(16).padStart(8, "0");*/

			const getFileData = async (filename, path, {chancesLeft = 3, signal = currentProcess.signal}) => {
				if(signal.aborted) return;
				if(chancesLeft > 0)
					return fetch(
						`${location.origin}/downloadCourseFile.do?path=${path}`,
						{signal}
					).catch(error => {
						if(error.name == "userAborted") return;

						logStatus(`下載 <code>${filename}</code> 時發生錯誤，剩餘重試次數：${chancesLeft}……`);
						console.log(`下載 <code>${filename}</code> 時發生錯誤，剩餘重試次數：${chancesLeft}……`, error);
						return getFileData(readableName, path, {chancesLeft: chancesLeft - 1});
					});

				logStatus(`下載檔案 <code>${filename}</code> 時發生錯誤，不再重試，逕行以空白檔案替代。`, "color: red");
				return new Response("下載本檔案時發生錯誤。");
			};

			// log the new filenames while starting download files
			dataRows = dataRows.map(row => {
				[
					["doc", row.dn, row.dp],
					["media", row.mn, row.mp],
					["docOld", row.dn_old, row.dp_old],
					["mediaOld", row.mn_old, row.mp_old]
				].forEach(([type, name, path]) => {
					if(path) {
						if(!name) {
							log(`潛在的錯誤：學習成果 <code>#${row.id}</code> 有一檔案沒有檔名。稍後將嘗試推測。`);
							// !! in this situation, row.docZipPath & row.dn may change later !!
							// thus, check if all promises in filesToDownload are resolved
							// before to JSON.stringify(meta).
							//
							// I doubt if this will ever happen.
						}
						row[`${type}ZipPath`] = `learningOutcomes/${row.id}_${type}_${name || ""}`;
							// e.g. "檔案.pdf" -> "1234567_檔案.pdf"

						filesToDownload.push(new Promise(async resolve => {
							await new Promise(res => setTimeout(res, filesToDownload.length * 5000));
								// a traffic conjestion seems to happen whenever too much fetchs are issued

							log(`正在下載學習成果 <code>#${row.id}</code> 的${type == "doc" || type == "docOld" ? "文件" : "影音"}檔案`);
							const response = await getFileData(name, path, {signal: currentProcess.signal});
							if(currentProcess.signal.aborted) return;

							if(!name && response.headers.has("Content-Disposition")){
								// try to fix the dn (document name)
								let header = response.headers.get("Content-Disposition");
								let params = header.split(";");
								let encodedFilename = params
									.filter(param => param.match(/filename\*=/))[0]
									.replace(/filename\*=/g, "")
									.split("'")[2];
								if(encodedFilename){
									row[type == "doc" ? "dn" : type == "docOld" ? "dn_old" : type == "media" ? "mn" : "mn_old"]
										= decodeURIComponent(encodedFilename);
									row[type + "ZipPath"] += decodeURIComponent(encodedFilename);
									log(`成功下載學習成果 <code>#${row.id}</code> 的一個檔案，並推測檔名為 <code>${decodeURIComponent(encodedFilename)}</code>。`);
								}
							} else if (!name) {
								log(`成功下載學習成果 <code>#${row.id}</code> 的一個檔案，但始終無法為該檔案推測檔名。`);
							} else {
								log(`成功下載學習成果 <code>#${row.id}</code> 的檔案 <code>${name}</code>`);
							}

							resolve({path: row[`${type}ZipPath`], data: await response.blob()});
						}));
					} else if(name && !path) {
						log(`錯誤！檔案 <code>${name}</code> 不存在可供下載的路徑。`, "color: red");
					}
				});
				return row;
			});

			meta["learningOutcomes"] = dataRows;
		} // -- END OF 學習成果 --

		{ // -- START OF 多元表現 --
			logStatus("正在取得多元表現……");

			const json = await fetch(`${location.origin}/listStudentPerformance.do`, {
				method: "POST",
				headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
				body: new URLSearchParams({
					type: "upload",
					syear: "全部",
					session_key: session_key
				}).toString(),
				signal: currentProcess.signal
			}).then(res => res.json())
			.catch(err => {
				if (err.name == "userAborted") return;
				logStatus("錯誤：在取得多元表現時發生了未知的錯誤。", "color: red;");
				console.log("錯誤：在取得多元表現時發生了未知的錯誤。", err);
			});
			if(currentProcess.signal.aborted) return;

			let dataRows = [];
			meta["diversePerformances"] = {};
			for(let i = 1; i <= 10; i++) {
				meta["diversePerformances"][`${i}`] = json[`${i}`];
				json[`${i}`].dataRows.forEach(e => dataRows.push(e));
			}

			logStatus("已取得多元表現。");
			log(`<details><summary>取得的多元表現：</summary>${JSON.stringify(dataRows)}</details>`);

			const getFileData = async (filename, path, {chancesLeft = 3, signal = currentProcess.signal}) => {
				if(signal.aborted) return;
				if(chancesLeft > 0)
					return await fetch(
						`${location.origin}/performanceFile.do?path=${path}`,
						{signal}
					).catch(error => {
						if(error.name == "userAborted") return;

						logStatus(`下載${filename}時發生錯誤，剩餘重試次數：${chancesLeft}……`);
						console.log(`下載${filename}時發生錯誤，剩餘重試次數：${chancesLeft}……`, error);
						return getFileData(readableName, path, {chancesLeft: chancesLeft - 1});
					});

				logStatus(`下載檔案${filename}時發生錯誤，不再重試，逕行以空白檔案替代。`, "color: red");
				return new Response("下載本檔案時發生錯誤。");
			};

			dataRows.forEach(row => {
				[
					["certi", row.certiFile, row.df1],
					["media", row.mediaFile, row.df2]
				].forEach(([type, uuid, path]) => {
					if(!uuid != !path)
						log("錯誤！不該存有只有「UUID」與「下載路徑」其一屬性的檔案。", "color: red");

					if(!uuid || !path)
						return;

					filesToDownload.push(new Promise(async resolve => {
						await new Promise(res => setTimeout(res, filesToDownload.length * 5000));
							// a traffic conjestion seems to happen whenever too much fetchs are issued

						const humanReadableFileName =
							`多元表現 <code>#${row.id}</code> 的${type == "certi"? "證明文件／作品成果": "影音檔案"}`;
						log(`正在開始下載 ${humanReadableFileName}……`);
						let response = await getFileData(
							humanReadableFileName,
							path,
							{signal: currentProcess.signal}
						);
						if(currentProcess.signal.aborted) return;

						let header = response.headers.get("Content-Disposition") || "";
						let params = header.split(";");
						let encodedFilename = params
							.filter(param => param.match(/filename\*=/))[0]
							?.replace(/filename\*=/g, "")
							?.split("'")[2] || "";
						let filename = decodeURIComponent(encodedFilename);

						row[`${type}Filename`] = filename;
						row[`${type}ZipPath`] = `diversePerformances/${row.id}_${filename}`;

						log(`成功下載多元表現 <code>#${row.id}</code> 的檔案 <code>${row[`${type}Filename`]}</code>。`);

						resolve({path: row[`${type}ZipPath`], data: await response.blob()});
					}));
				});
			});
		} // -- END OF 多元表現 --

		// create zip
		logStatus("正在等待所有下載完成……");
		let backupZip = new JsZip();
		await Promise.all(filesToDownload).then(allFiles => {
			log("所有下載已完成。");
			backupEndedTime = new Date();
			meta.backupEndedTime = `${backupEndedTime.getTime()}`;

			logStatus("正在封裝備份檔……");
			allFiles.forEach(
				({path, data}) => backupZip.file(path, data)
			);
			const metaJson = JSON.stringify(meta);
			backupZip.file("meta.json", metaJson);
			backupZip.file("index.html", indexHtml.replaceAll("REPLACE_THIS_WITH_META_JSON", metaJson));
			backupZip.file("README使用前請先讀我.txt", `
This backup is created by taipeiAcademyPortfolioBackupTool.
／本備份檔由「臺北市 學生學習歷程檔案系統 備份器」建立。

Repository／本專案程式碼儲存庫：
https://github.com/XiaoPanPanKevinPan/taipeiAcademyPortfolioBackupTool

Creation Time／建立時間: ${backupEndedTime.toISOString()}
----------------------------------------------------------------------
Q: How to view this backup?／問：怎麽檢視這個備份檔？

A: Please open the "index.html" file in your browser.
	 ／請在瀏覽器中開啟 "index.html" 檔案。

	 Also, you can just view the files in the directories.
	 ／另外，您也大可直接瀏覽各資料夾中的檔案。
----------------------------------------------------------------------
Q: What's the file named "meta.json"?
	 ／那個叫做 "meta.json" 的檔案是什麼？
A: It's the metadata of your academy portfolio, containging things
	 like the date you upload, the brief you write, etc. Though after
	 deleting it, "index.html" can still work normally, however I don't
	 recommend doing so. The file is easy for other applications
	 to process, so you should keep in case one day you want to use
	 your backup other ways.
	 ／那個是你的學習歷程歷程檔案的後設資料（檔案的詳細資訊），包含檔案
	 上傳時間、你的檔案簡述等等。雖然刪除後，"index.html" 仍然可以正常
	 運作，但我建議不要刪掉。這個檔案對其他應用程式來說，相對好讀取。
	 所以你最好把它留著，以待有天你想把備份檔挪作他用。
----------------------------------------------------------------------
Q: The filenames are unreadable (garbled). What should I do?
	 ／檔案名稱出現亂碼了。我該怎麽辦？
A: You should try another Zip File Manager that decodes this backup
	 in UTF-8, e.g. 7-Zip. You may also want to try this in-browser
	 tool: https://gildas-lormeau.github.io/zip-manager/
	 ／你應該嘗試其他可以透過 UTF-8 解碼本備份檔的 Zip 檔案管理器，
	 例如 7-Zip。 你可能也會想要試試看這個在瀏覽器內執行的工具：
	 https://gildas-lormeau.github.io/zip-manager/
			`)
		});

		fileUri = JsZip.support.blob
			? URL.createObjectURL(await backupZip.generateAsync({type: "blob"}))
			: "data:application/zip;base64," + await backupZip.generateAsync({type: "base64"});

		downloadBtn.disabled = false;

		if(currentProcess.signal.aborted) return;
		log("備份程序已成功執行，檔案可供下載。", "color: green;");
		log("07/13 更新：請注意，本備份檔並未包含「非提交項目」中的資訊。有需要者請視情況，手動備份", "color: #darkgoldenrod");
		status("檔案可供下載。", "color: green;");

		startBackupBtn.style["display"] = "";
		abortBackupBtn.style["display"] = "none";
		currentProcess = null;

		logStatus("備份程式已就緒。", "color: green;");
	});

	log("程式作者：XiaoPanPanKevinPan。請注意，這不是一個官方程式。本軟體採 MIT License 授權釋出。");
	logStatus("備份程式已就緒。", "color: green");
})();
