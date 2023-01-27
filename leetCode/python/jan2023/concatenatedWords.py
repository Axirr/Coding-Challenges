from typing import List
class Node:
    value = None
    childrenDict = None
    isEnd = None

    def __init__(self, value):
        self.value = value
        self.childrenDict = {}
        self.isEnd = False


    def addChild(self, newChildNode):
        self.childrenDict[newChildNode.value] = newChildNode
        

class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        words.sort(key=lambda a: len(a), reverse=True)
        concatenatedWords = []
        wordMap = Node(-1)

        for i in range(len(words) - 1, -1, -1):
            currentWord = words[i]
            if self.isWordConcatendated(currentWord, wordMap):
                concatenatedWords.append(currentWord)
            else:
                self.addWordToWordMap(wordMap, currentWord)
        return concatenatedWords

    def wordMapListForWords(self, words: List[str]) -> List[str]:
        words.sort(key=lambda a: len(a), reverse=True)
        concatenatedWords = []
        wordMap = Node(-1)
        tempList = []

        for i in range(len(words) - 1, -1, -1):
            currentWord = words[i]
            if self.isWordConcatendated(currentWord, wordMap):
                concatenatedWords.append(currentWord)
            else:
                self.addWordToWordMap(wordMap, currentWord)
                tempList.append(currentWord)
        return tempList
    
    def isWordConcatendated(self, target, wordMap):
        alternateStarts = [0]
        while alternateStarts:
            start = alternateStarts.pop()
            currentNode = wordMap
            for i in range(start, len(target)):
                letter = target[i]
                currentDict = currentNode.childrenDict
                if letter in currentDict:
                    node = currentNode.childrenDict[letter]
                    # If last letter of word and letter is an endpoint, we have a match
                    if i == (len(target) - 1) and node.isEnd:  return True

                    # If no children for node but node is an end, set currentLevel to top
                    if (len(node.childrenDict)) == 0:
                        if node.isEnd:
                            currentNode = wordMap
                        else:
                            continue
                    # If children for node but node is an end, add next index as an alternate start
                    # if this one fails
                    else:
                        if node.isEnd:
                        # No index check needed here because function returns if i == len(target) - 1
                            alternateStarts.append(i + 1)
                        currentNode = node
                else:
                    break
        return False
    
    def addWordToWordMap(self, rootList, newWord):
        currentParent = rootList
        for i in range(len(newWord)):
            letter = newWord[i]
            currentChildren = currentParent.childrenDict
            if letter in currentChildren:
                currentParent = currentChildren[letter]
            else:
                newNode = Node(letter)
                currentParent.addChild(newNode)
                currentParent = newNode
            if i == len(newWord) - 1:
                currentParent.isEnd = True
    
    def prettyPrintWordMap(self, wordMap):
        level = [wordMap.childrenDict]
        levelNum = 1
        while level:
            print("Level %d" % levelNum)
            nextLevel = []
            for myDict in level:
                for key in myDict:
                    node = myDict[key]
                    print(node.value)
                    print(node.isEnd)
                    if len(node.childrenDict) > 0:
                        nextLevel.append(node.childrenDict)
            level = nextLevel
            levelNum += 1
    
    def searchWithPreConstructedWordMap(self, words, wordMap):
        # Unnecessary but want time to be the same
        words.sort(key=lambda a: len(a), reverse=True)
        concatenatedWords = []
        # wordMap = Node(-1)

        for i in range(len(words) - 1, -1, -1):
            currentWord = words[i]
            if self.isWordConcatendated(currentWord, wordMap):
                concatenatedWords.append(currentWord)
            # else:
            #     self.addWordToWordMap(wordMap, currentWord)
        return concatenatedWords


def main():
    sol = Solution()
    # wordsInWordMap = sol.wordMapListForWords(words)
    # for word in wordsInWordMap:
    #     print(word, " ")
    wordsInWordMap = ['l', 'x', 'w', 'f', 'b', 'd', 'g', 'r', 't', 'k', 'o', 'm', 'p', 'v', 'a', 'y', 'n', 'u', 'e', 'h', 's', 'c', 'q', 'jm', 'zd', 'il', 'uz', 'fz', 'if', 'jp', 'xz', 'id', 'zz', 'jf', 'jy', 'bci', 'zea', 'eiu', 'cjl', 'zvu', 'oai', 'faz', 'nig', 'wiw', 'zmg', 'oja', 'upj', 'uip', 'iwh', 'jav', 'wzi', 'zjv', 'ivd', 'inx', 'tiq', 'lim', 'ljxl', 'rjzv', 'pvcz', 'ivws', 'vewj', 'kkfj', 'igwb', 'jrxd', 'yqsj', 'odjq', 'miwdn', 'ihicd', 'mfccj', 'iephs', 'acnjx', 'gijjy', 'ipvqq', 'bgihl', 'cijyy', 'tdayz', 'yfikp', 'qujhd', 'zksmx', 'jxzon', 'hbjnb', 'khbzp', 'iizic', 'islif', 'jeobu', 'ktwtj', 'tcjup', 'upgei', 'ipfvr', 'tzlyb', 'qsmzc', 'mshoj', 'janxk', 'wjute', 'qplci', 'zhift', 'velbhj', 'gkzrpc', 'zljmwt', 'hfedli', 'zihegt', 'dibmye', 'gjykhz', 'zlteob', 'eyavnz', 'vhnqvi', 'wblxki', 'zjyagi', 'zechoc', 'svjgzk', 'edkxjq', 'nbuinl', 'ncvrjo', 'oqkijy', 'micmun', 'aljhrx', 'rghzyz', 'yzwfor', 'jdkgfc', 'spsqiu', 'upityz', 'abinmy', 'ihmfrj', 'objltu', 'lzqrxl', 'prtvoju', 'mbbhfli', 'mjewiyo', 'imqypqo', 'vbgjtbv', 'dxmzhoq', 'zceuuwg', 'xkelind', 'iobioqm', 'kjwdqeg', 'yyifkin', 'mplirup', 'lbgihet', 'hvyimhe', 'ujxcxck', 'qthkcij', 'phiuvdv', 'tltienw', 'rmajxis', 'uskihek', 'ooetjiz', 'rzuqsyr', 'nwhpiid', 'bztvaal', 'hzkosvn', 'nuqhmfj', 'fbrpzlk', 'eziwkmg', 'aozmixr', 'bedrqfui', 'cqnlvlzr', 'wmqigymr', 'qrsjchxp', 'ywdsjegd', 'xhppcjnq', 'cwupzrts', 'zyiurxvf', 'igxprunj', 'taqakgim', 'tpnwwiif', 'fxwiaqqb', 'gcdxstpz', 'vnrrzerz', 'cpjesdzy', 'xgtpdtkz', 'ybrhodjn', 'xbpipyhh', 'qbsqtipq', 'jpjxcjyi', 'kxwldnmi', 'zuufzphd', 'vumnwehj', 'anhsyxli', 'gvwxljbo', 'lihdnvud', 'wjkfvabn', 'pzchrgef', 'lwhhjwsl', 'kscfodjxg', 'opajzeahv', 'vjqpzkcfc', 'opwyfovdz', 'tvvimvroz', 'ajrcsfogh', 'byzhtvvpj', 'batvzmziq', 'jxigaskpj', 'zagpiuiia', 'dtjrrkxro', 'jdgwjbztl', 'fnlaozmff', 'qzyabzrco', 'iiygnzfov', 'jtizpezjl', 'sgenjcfxr', 'ijeglxsvc', 'tkkolzcfi', 'mhrbdxjwi', 'schgwrrzt', 'jlxnoixsy', 'hllwnqozf', 'zylbhoaac', 'cibpynkxg', 'ijsnfkpfy', 'iwpdklhum', 'zbphmgoxq', 'pjzdkmoue', 'zpmqfbmnr', 'jbtvitkqn', 'vgmkgjwle', 'ukjqsjbmp', 'jncxgviyu', 'czohpyewf', 'ppzaecvmx', 'hsrznlzrf', 'umzpnoiei', 'biztkfomz', 'msxphqdgz', 'jqmdabmyu', 'zoolzslgd', 'aqufowbig', 'hqjtkqaqh', 'apwlmbzit', 'ghzlgnfoas', 'akvmxzbaei', 'pzsupxoflq', 'ufgmypupei', 'jedyedimaa', 'rexuhucxpi', 'oqxbypihdv', 'ixylxjmlfv', 'jvdrjkhxkq', 'iqbqjlnpbf', 'xazjarqgfm', 'dzwwzaelmo', 'cqkrtbxgzg', 'urtxsezrwz', 'qgztvqdolf', 'hqqevqjugi', 'krzolrglgn', 'mwtqjwbhgh', 'hzaplclkwl', 'fbuujzxhln', 'wofwgjkykm', 'bvazmzbndl', 'gjftyfehik', 'gwoxjicdkv', 'jrliuaifpp', 'wikfuxwjht', 'iwbnzhybsx', 'znrvjqeyqi', 'jpyntsefxi', 'aajpfpyljt', 'cdzcuunkrf', 'mjfqwltvzk', 'yeqfqojwtw', 'zyesldujjlp', 'isdbplotyak', 'irzosjuncvh', 'hwialkbjgzc', 'ilfzpszgrgj', 'tkzpzrscwbx', 'nrwsjaxzwmh', 'vzemmxtklis', 'curkxfoimnw', 'ngnpxjkxims', 'tviihjwxdcz', 'iltaqzawhgu', 'fewjjscjrei', 'zjhudtpqsfc', 'zveswrjevfz', 'wglucmugwqi', 'xweimxlnzoh', 'ulicojzjfrc', 'uspujvqhydw', 'dwneyqisozq', 'zgxgodlhmix', 'glvbtkegzjs', 'pmvfvyguqdi', 'kbesuhquepj', 'ygeraoozbtt', 'fbiguhsfuqo', 'sbphcejuylh', 'dzfpfnwbfuj', 'lugpktauixp', 'fdgpouzjwbq', 'vyeikgjdnml', 'gznfnqydisn', 'fhdzsbiyjld', 'ngiutnuqbzi', 'xhhivxnutkx', 'jtxytykkcku', 'suxteeitxtg', 'xrrcfuusicc', 'jvtfzddlgch', 'ovytgaufpjl', 'sngqvoijxuv', 'fmwevhwlezo', 'sileeztxwjl', 'rfkqyuqfjkx', 'pnkeluekvelj', 'lqjnqzrwrmgt', 'toxmxzimgfao', 'xrbasbznvxas', 'fzgyhvnwjcns', 'igfagitkrext', 'yldwwgezlqur', 'czqeevvbvcwh', 'rbbyklndcqdj', 'rmoybqjjgdyo', 'klgohcmmbukz', 'liguhuxudbnh', 'wqtldwhjouas', 'zcmukotirrxx', 'hiwxrgftittd', 'fqmwciqtynca', 'uvfmaicednym', 'vfaimxrqnyiq', 'tffmjggrmyil', 'euexyudhrioi', 'zsmhylnjpktb', 'rlzddjzcshvd', 'dlazixtlxyvm', 'tyjmnhlfnrtz', 'xgaujnyclcjq', 'nlzdhucvayrz', 'xrcorfygjxpi', 'naiqyufxffdw', 'rxfcztzqopdi', 'topsuqomfjrd', 'zaqswwofedxj', 'apzuhsbssaxj', 'hstyopbvuiqc', 'lkfrimprrhen', 'nmhskodmidaj', 'ufzazyxtqxcu', 'cyvfiykmkllf', 'mwdgxaigmxpy', 'tyycsibbeaxn', 'wogwczlkyrde', 'ygjtyzleizme', 'cijcyrgmqirz', 'wnqwqecyjyib', 'imqpzwmshlpj', 'yaxzfbjbkrxi', 'kczvhsybloet', 'drswybwlfyzph', 'bqajopjjlfthe', 'tpjidglpxqfxv', 'tutjdfnvhahxy', 'jvkmxhtmyznha', 'hcnhhrajahitn', 'inpobubzbvstk', 'iwbdvusywqlsc', 'ztlbggsuzctoc', 'updqikocrdyex', 'qzjbrpljwuzpl', 'cnsmgmwmpbgjq', 'rjhykpadahbhj', 'cdvdpvjlagwmg', 'umofzhhowyftz', 'pzcejvxzeoybb', 'howbzhaoscgyk', 'wrjxffzbjexsh', 'iqebfibigljbc', 'iizudxqjvfnky', 'earjrncmmkdel', 'ldhlhqdyjcfhu', 'evhyfnlohavrj', 'azefobxutitrf', 'iucrmmmjqtcey', 'dmzdzveslyjad', 'fnxwgqtvwztje', 'aqhlswbzievij', 'zxqyhvizqmamj', 'ypaotdzjxxrsc', 'fpbuiujlolnjl', 'lznfhbaokxvce', 'zxjegsyovdrmw', 'mqhoggvrvjqrp', 'lwstjkoxbczkj', 'snjniegvdvotu', 'rdkugsbdpawxi', 'iznorvonzjfea', 'hbrcewjxvcezi', 'adzpbfudkklrw', 'vnrtysfrzrmzl', 'dtttiixlhpikbv', 'crcszmgplszwfn', 'athltizloasimp', 'dynaiukctgrzjx', 'yjutkeqakoarru', 'oorbyyiigppuft', 'qwdmfpwvamisns', 'vzuszqvhlmapty', 'bwfqqvjcukjbsg', 'fvnyqkzlheruxr', 'fjwrhjcrtbcytn', 'iedzqswrsnfmnn', 'ydgxlrjzucxyid', 'srfyjjumcbxole', 'ffxviyvsktqrfa', 'poeugoqynkbfiv', 'ncsyjlzlxyyklc', 'tqthlftjblnpht', 'wgzvqkxuqrsqxs', 'rncplkeweoirje', 'pjxurgqbtldims', 'kvhhwkzvtvlhhb', 'eibcapetpmeaid', 'astaiamnepwkya', 'juffuguqepwnfh', 'fapfvrmezbsjxs', 'qiaixdtbhqvlzd', 'fnsbijkeepyxry', 'zchpicyuawpovm', 'pciulccqssaqgd', 'lcibpxkidmwexp', 'vhsgzvwiixxaob', 'cyhbsuxnlftmjc', 'npitruijvyllsi', 'bbufnxorixibbd', 'bbqeonycaegxfj', 'mowsjvpvhznbsi', 'wsdthzmlmbhjkm', 'endjvxjyghrveu', 'zxbshnrvbykjql', 'bljvkypcflsaqe', 'kggdgpljfisylt', 'ovqzgdixrpddzp', 'klaitgdphcspij', 'mnlpimduzgmwszc', 'vtpieworwhyiucs', 'cjbmsamjyqqrasz', 'rjfozvgmdakdhao', 'jxxvzdjlpyurxpj', 'swpksfdxicemjbf', 'mkgiwfvqfkotpdz', 'mfomgxjphcscuxj', 'zpsbhgokwtfcisj', 'jszyeruwnupqgmy', 'oadojxmvgqgdodw', 'oklsqebuzeziisw', 'swmalgbgpaplqgz', 'vmoymbmytjvfcgt', 'kgaynkddbzllecd', 'dvwhbyumthkiktb', 'yrmooliaobbnlap', 'urxkwcypctjkabi', 'zbotrokaxaryxlk', 'kcqjjwcwuhvzydm', 'ifdegsyjtswselk', 'mzuejrttefhdwqc', 'higfkfavgeemcgo', 'cjcywjkfvukvveq', 'eadosqafyxbmzgr', 'rlrstkcbtikklmh', 'bwnkxnwpzeoohlx', 'mqopusqktdthpvz', 'chyicqibxdgkqtg', 'ztzdjqmadthtdmv', 'lbdlcumdgixjbcq', 'sqqyrxtjkcalswq', 'jonqwhkwezjvjgg', 'ogwaxrssjxgvnka', 'ybaibmzonzqlnmd', 'ahqghzhoqprgkym', 'tkbkoljyodlipof', 'lpprjjalchhhcmh', 'alsyxezjwtlwmxv', 'iehimvoymyjasin', 'fhxbldylqqewdnj', 'hujdmcyxdqteqja', 'berbpmglbjipnuj', 'lrfkraoheucsvpi', 'odjgdgzfmrazvnd', 'zkndgojnjnxqsoqi', 'gwsibcqahmyyeagk', 'ekfkuajjogbxhjii', 'vwtifcoqepqyzwya', 'ssebtpznwoytjefo', 'ljhqsaneicvaerqx', 'gpucqwbihemixqmy', 'sjvmsbrcfwretbie', 'ktrniqwoofoeenbz', 'bvmuyarjwqpcoywa', 'vorxwgdtgjilgydq', 'qrwfajnfahyqocdb', 'oxbbemejgosgcynf', 'jyajrkcvysicisab', 'dazwzwtdjoyuqeqj', 'blbxhjsgcuoxmqft', 'vepcxhozpjxtreyn', 'hiyjlkxmeplnrvxg', 'onzgeyddkqwuhnim', 'ioajuppvqluhbdet', 'poxcgnexmaajzuha', 'dftdyelydzyummmt', 'ybugjsblhzfravzn', 'piwllpgnlpcnezqs', 'vtdlzwpbhcsbvjno', 'wyvfpjyglzrmhfqp', 'qjwufmwresfsfaok', 'djpchowhwevbqvjj', 'nrzbllldgdmyrpgl', 'ysljsqminajfipds', 'zngyodiqlchxyycx', 'lzandlltowjpwsal', 'pbozezeygljfftvy', 'rcumyacqdapwczen', 'sebevsopjvciwljf', 'vqythyvzxbcgrlbg', 'jfrfgznuaytvaegm', 'hqoyefmugjvewhxu', 'publurhztntgmimc', 'rgorfbjrofokggaf', 'voibuvbhhjcdflvl', 'yfqvnvtnqspyjbxr', 'vhtonlampljgzyve', 'lvvgoifltzywueyp', 'yybwsjmajbwtuhkk', 'mflvioemycnphfjt', 'owijatklvjzscizr', 'evcuanuujszitaoa', 'mlvyoshiktodnsjj', 'iaxakholawoydvch', 'crfhpxprbsshsjxd']
    wordMap = Node(-1)
    for word in wordsInWordMap:
        sol.addWordToWordMap(wordMap, word)
    words = ["rfkqyuqfjkx","vnrtysfrzrmzl","gfve","qfpd","lqdqrrcrwdnxeuo","q","klaitgdphcspij","hbsfyfv","adzpbfudkklrw","aozmixr","ife","feclhbvfuk","yeqfqojwtw","sileeztxwjl","ngbqqmbxqcqp","khhqr","dwfcayssyoqc","omwufbdfxu","zhift","kczvhsybloet","crfhpxprbsshsjxd","ilebxwbcto","yaxzfbjbkrxi","imqpzwmshlpj","ta","hbuxhwadlpto","eziwkmg","ovqzgdixrpddzp","c","wnqwqecyjyib","jy","mjfqwltvzk","tpvo","phckcyufdqml","lim","lfz","tgygdt","nhcvpf","fbrpzlk","shwywshtdgmb","bkkxcvg","monmwvytby","nuqhmfj","qtg","cwkuzyamnerp","fmwevhwlezo","ye","hbrcewjxvcezi","tiq","tfsrptug","iznorvonzjfea","gama","apwlmbzit","s","hzkosvn","nberblt","kggdgpljfisylt","mf","h","bljvkypcflsaqe","cijcyrgmqirz","iaxakholawoydvch","e","gttxwpuk","jf","xbrtspfttota","sngqvoijxuv","bztvaal","zxbshnrvbykjql","zz","mlvyoshiktodnsjj","qplci","lzqrxl","qxru","ygjtyzleizme","inx","lwhhjwsl","endjvxjyghrveu","phknqtsdtwxcktmw","wsdthzmlmbhjkm","u","pbqurqfxgqlojmws","mowsjvpvhznbsi","hdkbdxqg","ge","pzchrgef","ukmcowoe","nwhpiid","xdnnl","n","yjyssbsoc","cdzcuunkrf","uvouaghhcyvmlk","aajpfpyljt","jpyntsefxi","wjute","y","pbcnmhf","qmmidmvkn","xmywegmtuno","vuzygv","uxtrdsdfzfssmel","odjgdgzfmrazvnd","a","rdkugsbdpawxi","ivd","bbqeonycaegxfj","lrfkraoheucsvpi","eqrswgkaaaohxx","hqjtkqaqh","berbpmglbjipnuj","wogwczlkyrde","aqufowbig","snjniegvdvotu","ocedkt","bbufnxorixibbd","rzuqsyr","qghoy","evcuanuujszitaoa","wsx","glafbwzdd","znrvjqeyqi","npitruijvyllsi","objltu","ryp","nvybsfrxtlfmp","id","zoolzslgd","owijatklvjzscizr","upmsoxftumyxifyu","xucubv","fctkqlroq","zjv","wzi","ppvs","mflvioemycnphfjt","nwedtubynsb","repgcx","gsfomhvpmy","kdohe","tyycsibbeaxn","wjkfvabn","llkmagl","thkglauzgkeuly","paeurdvexqlw","akdt","ihmfrj","janxk","rqdll","cyhbsuxnlftmjc","yybwsjmajbwtuhkk","ovytgaufpjl","iwbnzhybsx","mumbh","jqmdabmyu","br","lwstjkoxbczkj","vhsgzvwiixxaob","fso","qnebmfl","ooetjiz","lq","msxphqdgz","mqhoggvrvjqrp","xbhkkfg","zxjegsyovdrmw","jav","mshoj","ax","biztkfomz","hujdmcyxdqteqja","gqgsomonv","reqqzzpw","lihdnvud","lznfhbaokxvce","fhxbldylqqewdnj","rlbskqgfvn","lfvobeyolyy","v","iwh","fpbuiujlolnjl","gvwxljbo","ypaotdzjxxrsc","mwrvel","umzpnoiei","ogwilaswn","yw","egdgye","hsrznlzrf","mwdgxaigmxpy","yaqgault","dtlg","cyvfiykmkllf","zxqyhvizqmamj","lvvgoifltzywueyp","abinmy","ppzaecvmx","qsmzc","iddymnl","uskihek","evxtehxtbthq","jvtfzddlgch","czohpyewf","ufzazyxtqxcu","brxpfymuvfvs","xrrcfuusicc","aqhlswbzievij","rv","udvmara","upityz","fecd","suxteeitxtg","dfuydrtbfypbn","cypqodxr","wikfuxwjht","jrliuaifpp","vkmxys","wvpfyfpkvgthq","rmajxis","jncxgviyu","av","nmhskodmidaj","lkfrimprrhen","uip","hstyopbvuiqc","p","vwduwmjpblqo","fnxwgqtvwztje","xwnbcuggl","iehimvoymyjasin","spsqiu","flhyfac","mqrbq","pstsxhplrrmbeddv","hnegtuxx","alsyxezjwtlwmxv","jtxytykkcku","bhhlovgcx","xhhivxnutkx","had","aysulvk","m","anhsyxli","jdkgfc","potn","lcibpxkidmwexp","gwoxjicdkv","tltienw","ngiutnuqbzi","o","tzlyb","vumnwehj","os","np","lhv","uzvgyeette","ipfvr","lpprjjalchhhcmh","k","pciulccqssaqgd","tp","dmzdzveslyjad","wtsbhgkd","eouxbldsxzm","vhtonlampljgzyve","xhnlcrldtfthul","xhflc","upgei","rlaks","yfqvnvtnqspyjbxr","phouoyhvls","voibuvbhhjcdflvl","rgorfbjrofokggaf","dqhqats","zchpicyuawpovm","yzwfor","koat","pybf","fhdzsbiyjld","gznfnqydisn","xz","po","tcjup","wygsnxk","kqlima","fgxnuohrnhg","publurhztntgmimc","zuufzphd","iucrmmmjqtcey","wnnbq","rghzyz","ukjqsjbmp","mdtrgv","vyeikgjdnml","kxwldnmi","apzuhsbssaxj","tkbkoljyodlipof","nkq","ktwtj","vgmkgjwle","t","agylw","vomtuy","jbtvitkqn","vtdxwrclpspcn","rdrls","yxfeoh","upj","myctacn","fdnor","ahqghzhoqprgkym","phiuvdv","jp","fdgpouzjwbq","hqoyefmugjvewhxu","qfzwuwe","fnsbijkeepyxry","oja","qthkcij","zpmqfbmnr","ybaibmzonzqlnmd","svo","gjftyfehik","jfrfgznuaytvaegm","aljhrx","odjq","ogwaxrssjxgvnka","zaqswwofedxj","lugpktauixp","dc","odknlbvxrs","jeobu","vqythyvzxbcgrlbg","hwc","erpbaxq","ujxcxck","rrklkb","wlrwyuy","zmg","yyhga","xwdbycdu","htedgvsrhchox","wr","suhesetv","jonqwhkwezjvjgg","sqqyrxtjkcalswq","hvyimhe","pjzdkmoue","zbphmgoxq","lbdlcumdgixjbcq","ztzdjqmadthtdmv","qcagsyqggcf","if","jpjxcjyi","chyicqibxdgkqtg","iwpdklhum","wljmg","micmun","npdbamofynykqv","ijsnfkpfy","lmq","oyjmeqvhcrvgm","mqopusqktdthpvz","fz","r","qbsqtipq","nxtsnason","xbpipyhh","topsuqomfjrd","islif","gbndakaq","bwnkxnwpzeoohlx","hrtbfnq","fguvomeepxoffg","mat","dzfpfnwbfuj","onlvy","cwcchvsasdylb","rxfcztzqopdi","ybrhodjn","oqkijy","ncvrjo","dphbfaal","xgtpdtkz","sebevsopjvciwljf","rcumyacqdapwczen","mabkapuoud","pbozezeygljfftvy","bvazmzbndl","vl","qiaixdtbhqvlzd","ffjfb","svthrfmkoxbho","cvet","ucgqyvopafyttrh","lbgihet","naiqyufxffdw","vruh","uz","ukffmudygjavem","dccamymhp","wofwgjkykm","fbuujzxhln","kmm","lzandlltowjpwsal","fapfvrmezbsjxs","wiw","sc","soqlh","hzaplclkwl","gcdqbcdwbwa","gadgt","pgowefka","juffuguqepwnfh","nbuinl","cpdxf","sox","fq","lfnrhgsxkhx","xrcorfygjxpi","mwtqjwbhgh","loc","fkglorkkvx","nlzdhucvayrz","azefobxutitrf","rlrstkcbtikklmh","ggk","sbphcejuylh","nraoenhd","zngyodiqlchxyycx","rrbhfwohfv","krzolrglgn","cpjesdzy","yoifoyg","hqqevqjugi","ahmv","xgaujnyclcjq","evhyfnlohavrj","byyvhgh","hyw","kedhvwy","ysljsqminajfipds","rglnpxfqwu","cibpynkxg","su","mbntqrlwyampdg","nig","ldhlhqdyjcfhu","jfymrbafmyoc","tyjmnhlfnrtz","dlazixtlxyvm","fbiguhsfuqo","rhymsno","rkbdlchs","ocbbwwd","astaiamnepwkya","mplirup","edkxjq","g","exlwulswtvot","tlnc","vnrrzerz","ygeraoozbtt","yyifkin","eo","ua","qgztvqdolf","rlzddjzcshvd","khxkdxflwxme","kk","zylbhoaac","cw","iizic","gcdxstpz","kjwdqeg","earjrncmmkdel","kbesuhquepj","nrzbllldgdmyrpgl","hllwnqozf","djpchowhwevbqvjj","zsmhylnjpktb","pxnktxkm","fxwiaqqb","qjwufmwresfsfaok","aa","d","iobioqm","svjgzk","khbzp","euexyudhrioi","yqsj","ngrwqpoh","rwuvd","eruffmlg","bxzovyew","faz","pmvfvyguqdi","jlxnoixsy","hyfrdngjf","ly","eibcapetpmeaid","tpnwwiif","pfgsp","kvhhwkzvtvlhhb","pjxurgqbtldims","rncplkeweoirje","akyprzzphew","wyvfpjyglzrmhfqp","ubheeqt","rmbxlcmn","taqakgim","apsbu","khwnykughmwrlk","vtdlzwpbhcsbvjno","tffmjggrmyil","schgwrrzt","mvndmua","nlwpw","glvbtkegzjs","piwllpgnlpcnezqs","xkelind","urtxsezrwz","zechoc","vfaimxrqnyiq","ybugjsblhzfravzn","btgcpqwovwp","zgxgodlhmix","sfzdknoxzassc","wgzvqkxuqrsqxs","dwneyqisozq","fg","vhfsf","uspujvqhydw","eadosqafyxbmzgr","tyff","blolplosqnfcwx","uwkl","puenodlvotb","iizudxqjvfnky","cjcywjkfvukvveq","jrxd","igwb","dftdyelydzyummmt","uvfmaicednym","oai","higfkfavgeemcgo","naefganqo","iqebfibigljbc","ulicojzjfrc","igxprunj","cymbrl","fqmwciqtynca","zjyagi","mzuejrttefhdwqc","zyiurxvf","wrjxffzbjexsh","wrxw","mhrbdxjwi","htknfa","wfrvxqdkhbwwef","vqsghhhutdget","cwupzrts","hbjnb","wpccoa","nx","howbzhaoscgyk","bilt","wqqatye","zceuuwg","jxzon","kkfj","bwsezd","ifdegsyjtswselk","xweimxlnzoh","tqthlftjblnpht","ww","ss","b","jmruuqscwjp","nxbk","wd","cqkrtbxgzg","xhppcjnq","cfq","tkkolzcfi","wblxki","ijeglxsvc","kcqjjwcwuhvzydm","gubqavlqffhrzz","hiwxrgftittd","caybc","ncsyjlzlxyyklc","poxcgnexmaajzuha","dhaccuualacyl","mtkewbprs","oncggqvr","sqqoffmwkplsgbrp","ioajuppvqluhbdet","dzwwzaelmo","afumtqugec","wglucmugwqi","zveswrjevfz","nxlbkak","pzcejvxzeoybb","fd","vewj","ivws","zjhudtpqsfc","zcmukotirrxx","zksmx","umofzhhowyftz","zbotrokaxaryxlk","ueolqk","dxmzhoq","zvu","cjl","esfmqgvxwfy","npbep","vbgjtbv","poeugoqynkbfiv","fewjjscjrei","yqssxzsydgllfzmo","urxkwcypctjkabi","wqtldwhjouas","tovdtkr","onzgeyddkqwuhnim","ffxviyvsktqrfa","qujhd","pvcz","hiyjlkxmeplnrvxg","hdykehkefp","vepcxhozpjxtreyn","liguhuxudbnh","f","ordxzm","klgohcmmbukz","yrmooliaobbnlap","dutnbetocxylcey","ywdsjegd","cr","blbxhjsgcuoxmqft","ngzdc","srfyjjumcbxole","dazwzwtdjoyuqeqj","xazjarqgfm","fxyfqbeoktcc","qrsjchxp","iltaqzawhgu","sgenjcfxr","yfikp","dvwhbyumthkiktb","walsx","jyajrkcvysicisab","brdeumb","tviihjwxdcz","dnrrgmem","ydgxlrjzucxyid","cdvdpvjlagwmg","ngnpxjkxims","gvyhnchlimsxc","w","jtizpezjl","qe","rjzv","vhnqvi","qm","iedzqswrsnfmnn","lt","utqfcqyrrwm","wtelvsqrru","fjwrhjcrtbcytn","qmqxceuohpiffaq","rmoybqjjgdyo","pmxttqftypfexlv","tg","qa","iqbqjlnpbf","kgaynkddbzllecd","tccvslp","curkxfoimnw","fvnyqkzlheruxr","iiygnzfov","coqs","oa","eiu","vzemmxtklis","lxu","nrwsjaxzwmh","tdayz","oxbbemejgosgcynf","ykbcn","hesvnctfvdsp","ku","rjhykpadahbhj","at","sxlngbtxmqr","wqrom","qzyabzrco","rbbyklndcqdj","cnsmgmwmpbgjq","krvnaf","qrwfajnfahyqocdb","fnlaozmff","vmoymbmytjvfcgt","cijyy","jdgwjbztl","swmalgbgpaplqgz","hfl","typttkrpfvx","tkzpzrscwbx","bwfqqvjcukjbsg","nxqmxr","x","eyavnz","il","dhthp","eyelg","npsoqsw","reogbmveofvusdsx","jvdrjkhxkq","qzjbrpljwuzpl","czqeevvbvcwh","vzuszqvhlmapty","yu","yldwwgezlqur","vorxwgdtgjilgydq","pknt","bgihl","ckorgrm","ixylxjmlfv","bpoaboylced","zea","igfagitkrext","ipvqq","dmoerc","oqxbypihdv","dtjrrkxro","rexuhucxpi","bvmuyarjwqpcoywa","qwdmfpwvamisns","bhopoqdsref","tmnm","cre","ktrniqwoofoeenbz","vlrfcsftapyujmw","updqikocrdyex","bcxw","eaum","oklsqebuzeziisw","fzgyhvnwjcns","dybjywyaodsyw","lmu","eocfru","ztlbggsuzctoc","ilfzpszgrgj","imqypqo","fump","sjvmsbrcfwretbie","oxpmplpcg","wmqigymr","qevdyd","gmuyytguexnyc","hwialkbjgzc","lmg","gijjy","lplrsxznfkoklxlv","xrbasbznvxas","twn","bhqultkyfq","saeq","xbuw","zd","kng","uoay","kfykd","armuwp","gtghfxf","gpucqwbihemixqmy","jedyedimaa","pbdrx","toxmxzimgfao","zlteob","adoshnx","ufgmypupei","rqyex","ljhqsaneicvaerqx","ng","sid","zagpiuiia","re","oadojxmvgqgdodw","jszyeruwnupqgmy","jxigaskpj","zpsbhgokwtfcisj","vep","ebwrcpafxzhb","gjykhz","mfomgxjphcscuxj","iwbdvusywqlsc","opvrnx","mkgiwfvqfkotpdz","inpobubzbvstk","vubuucilxyh","bci","dibmye","rlcnvnuuqfvhw","oorbyyiigppuft","swpksfdxicemjbf","goabwrqdoudf","yjutkeqakoarru","wuznnlyd","vfelxvtggkkk","mxlwbkbklbwfsvr","advraqovan","smkln","jxxvzdjlpyurxpj","ssebtpznwoytjefo","dynaiukctgrzjx","irzosjuncvh","hcnhhrajahitn","vwtifcoqepqyzwya","kddxywvgqxo","syxngevs","batvzmziq","mjewiyo","pzsupxoflq","byzhtvvpj","cqnlvlzr","akvmxzbaei","mwo","vg","ekfkuajjogbxhjii","isdbplotyak","jvkmxhtmyznha","lqjnqzrwrmgt","mbbhfli","bpeohsufree","ajrcsfogh","lucidbnlysamvy","tutjdfnvhahxy","urbrmmadea","hghv","acnjx","athltizloasimp","gu","rjfozvgmdakdhao","iephs","uztnpqhdl","rfuyp","crcszmgplszwfn","zihegt","xbspa","cjbmsamjyqqrasz","ghzlgnfoas","ljxl","cnumquohlcgt","jm","mfccj","hfedli","vtpieworwhyiucs","tdtuquartspkotm","pnkeluekvelj","ugrloq","zljmwt","fkyvqguqq","tpjidglpxqfxv","l","tvvimvroz","yy","opwyfovdz","pwlumocnyuoume","vjqpzkcfc","ihicd","dtttiixlhpikbv","goblttgvmndkqgg","gwsibcqahmyyeagk","prtvoju","lcblwidhjpu","kbu","pey","gkzrpc","bqajopjjlfthe","bc","lqs","zkndgojnjnxqsoqi","zyesldujjlp","drswybwlfyzph","xzluwbtmoxokk","bedrqfui","opajzeahv","lehdfnr","mnlpimduzgmwszc","velbhj","miwdn","wruqc","kscfodjxg","wcbm"]
    words = [word for word in words if word not in wordsInWordMap]
    resultWordList = sol.searchWithPreConstructedWordMap(words, wordMap)
    resultWordList.sort()
    resultWordList.sort(key=lambda x: len(x))
    correctOutput = ["gfve","qfpd","lqdqrrcrwdnxeuo","hbsfyfv","ife","feclhbvfuk","ngbqqmbxqcqp","khhqr","dwfcayssyoqc","omwufbdfxu","ilebxwbcto","ta","hbuxhwadlpto","tpvo","phckcyufdqml","lfz","tgygdt","nhcvpf","shwywshtdgmb","bkkxcvg","monmwvytby","qtg","cwkuzyamnerp","ye","tfsrptug","gama","nberblt","mf","gttxwpuk","xbrtspfttota","qxru","phknqtsdtwxcktmw","pbqurqfxgqlojmws","hdkbdxqg","ge","ukmcowoe","xdnnl","yjyssbsoc","uvouaghhcyvmlk","pbcnmhf","qmmidmvkn","xmywegmtuno","vuzygv","uxtrdsdfzfssmel","eqrswgkaaaohxx","ocedkt","qghoy","wsx","glafbwzdd","ryp","nvybsfrxtlfmp","upmsoxftumyxifyu","xucubv","fctkqlroq","ppvs","nwedtubynsb","repgcx","gsfomhvpmy","kdohe","llkmagl","thkglauzgkeuly","paeurdvexqlw","akdt","rqdll","mumbh","br","fso","qnebmfl","lq","xbhkkfg","ax","gqgsomonv","reqqzzpw","rlbskqgfvn","lfvobeyolyy","mwrvel","ogwilaswn","yw","egdgye","yaqgault","dtlg","iddymnl","evxtehxtbthq","brxpfymuvfvs","rv","udvmara","fecd","dfuydrtbfypbn","cypqodxr","vkmxys","wvpfyfpkvgthq","av","vwduwmjpblqo","xwnbcuggl","flhyfac","mqrbq","pstsxhplrrmbeddv","hnegtuxx","bhhlovgcx","had","aysulvk","potn","os","np","lhv","uzvgyeette","tp","wtsbhgkd","eouxbldsxzm","xhnlcrldtfthul","xhflc","rlaks","phouoyhvls","dqhqats","koat","pybf","po","wygsnxk","kqlima","fgxnuohrnhg","wnnbq","mdtrgv","nkq","agylw","vomtuy","vtdxwrclpspcn","rdrls","yxfeoh","myctacn","fdnor","qfzwuwe","svo","dc","odknlbvxrs","hwc","erpbaxq","rrklkb","wlrwyuy","yyhga","xwdbycdu","htedgvsrhchox","wr","suhesetv","qcagsyqggcf","wljmg","npdbamofynykqv","lmq","oyjmeqvhcrvgm","nxtsnason","gbndakaq","hrtbfnq","fguvomeepxoffg","mat","onlvy","cwcchvsasdylb","dphbfaal","mabkapuoud","vl","ffjfb","svthrfmkoxbho","cvet","ucgqyvopafyttrh","vruh","ukffmudygjavem","dccamymhp","kmm","sc","soqlh","gcdqbcdwbwa","gadgt","pgowefka","cpdxf","sox","fq","lfnrhgsxkhx","loc","fkglorkkvx","ggk","nraoenhd","rrbhfwohfv","yoifoyg","ahmv","byyvhgh","hyw","kedhvwy","rglnpxfqwu","su","mbntqrlwyampdg","jfymrbafmyoc","rhymsno","rkbdlchs","ocbbwwd","exlwulswtvot","tlnc","eo","ua","khxkdxflwxme","kk","cw","pxnktxkm","aa","ngrwqpoh","rwuvd","eruffmlg","bxzovyew","hyfrdngjf","ly","pfgsp","akyprzzphew","ubheeqt","rmbxlcmn","apsbu","khwnykughmwrlk","mvndmua","nlwpw","btgcpqwovwp","sfzdknoxzassc","fg","vhfsf","tyff","blolplosqnfcwx","uwkl","puenodlvotb","naefganqo","cymbrl","wrxw","htknfa","wfrvxqdkhbwwef","vqsghhhutdget","wpccoa","nx","bilt","wqqatye","bwsezd","ww","ss","jmruuqscwjp","nxbk","wd","cfq","gubqavlqffhrzz","caybc","dhaccuualacyl","mtkewbprs","oncggqvr","sqqoffmwkplsgbrp","afumtqugec","nxlbkak","fd","ueolqk","esfmqgvxwfy","npbep","yqssxzsydgllfzmo","tovdtkr","hdykehkefp","ordxzm","dutnbetocxylcey","cr","ngzdc","fxyfqbeoktcc","walsx","brdeumb","dnrrgmem","gvyhnchlimsxc","qe","qm","lt","utqfcqyrrwm","wtelvsqrru","qmqxceuohpiffaq","pmxttqftypfexlv","tg","qa","tccvslp","coqs","oa","lxu","ykbcn","hesvnctfvdsp","ku","at","sxlngbtxmqr","wqrom","krvnaf","hfl","typttkrpfvx","nxqmxr","dhthp","eyelg","npsoqsw","reogbmveofvusdsx","yu","pknt","ckorgrm","bpoaboylced","dmoerc","bhopoqdsref","tmnm","cre","vlrfcsftapyujmw","bcxw","eaum","dybjywyaodsyw","lmu","eocfru","fump","oxpmplpcg","qevdyd","gmuyytguexnyc","lmg","lplrsxznfkoklxlv","twn","bhqultkyfq","saeq","xbuw","kng","uoay","kfykd","armuwp","gtghfxf","pbdrx","adoshnx","rqyex","ng","sid","re","vep","ebwrcpafxzhb","opvrnx","vubuucilxyh","rlcnvnuuqfvhw","goabwrqdoudf","wuznnlyd","vfelxvtggkkk","mxlwbkbklbwfsvr","advraqovan","smkln","kddxywvgqxo","syxngevs","mwo","vg","bpeohsufree","lucidbnlysamvy","urbrmmadea","hghv","gu","uztnpqhdl","rfuyp","xbspa","cnumquohlcgt","tdtuquartspkotm","ugrloq","fkyvqguqq","yy","pwlumocnyuoume","goblttgvmndkqgg","lcblwidhjpu","kbu","pey","bc","lqs","xzluwbtmoxokk","lehdfnr","wruqc","wcbm"]
    correctOutput.sort()
    correctOutput.sort(key=lambda x: len(x))
    assert resultWordList == correctOutput
    words = ['l', 'x',     'w',     'f',     'b',     'd',     'g',     'r',     't',     'k',     'o',     'm',     'p',     'v',     'a',     'y',     'n',     'u',     'e',     'h',     's',     'c',     'q']
    wordMap = Node(-1)
    for word in words:
        sol.addWordToWordMap(wordMap, word)
    isConcat = sol.isWordConcatendated("id", wordMap)
    print(isConcat)
    assert not isConcat
    words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
    resultWordList = sol.findAllConcatenatedWordsInADict(words)
    resultWordList.sort()
    correctOutput = ["catsdogcats","dogcatsdog","ratcatdogcat"]
    correctOutput.sort()
    print(resultWordList)
    assert resultWordList == correctOutput
    words = ['l', 'x',     'w',     'f',     'b',     'd',     'g',     'r',     't',     'k',     'o',     'm',     'p',     'v',     'a',     'y',     'n',     'u',     'e',     'h',     's',     'c',     'q',    'jm',     'zd',     'il',     'if',     'jp',     'id',      'zz',     'jf',     'jy', ]
    wordMap = Node(-1)
    for word in words:
        sol.addWordToWordMap(wordMap, word)
    isConcat = sol.isWordConcatendated("fz", wordMap)
    print(isConcat)
    assert not isConcat
    words = ["rfkqyuqfjkx","vnrtysfrzrmzl","gfve","qfpd","lqdqrrcrwdnxeuo","q","klaitgdphcspij","hbsfyfv","adzpbfudkklrw","aozmixr","ife","feclhbvfuk","yeqfqojwtw","sileeztxwjl","ngbqqmbxqcqp","khhqr","dwfcayssyoqc","omwufbdfxu","zhift","kczvhsybloet","crfhpxprbsshsjxd","ilebxwbcto","yaxzfbjbkrxi","imqpzwmshlpj","ta","hbuxhwadlpto","eziwkmg","ovqzgdixrpddzp","c","wnqwqecyjyib","jy","mjfqwltvzk","tpvo","phckcyufdqml","lim","lfz","tgygdt","nhcvpf","fbrpzlk","shwywshtdgmb","bkkxcvg","monmwvytby","nuqhmfj","qtg","cwkuzyamnerp","fmwevhwlezo","ye","hbrcewjxvcezi","tiq","tfsrptug","iznorvonzjfea","gama","apwlmbzit","s","hzkosvn","nberblt","kggdgpljfisylt","mf","h","bljvkypcflsaqe","cijcyrgmqirz","iaxakholawoydvch","e","gttxwpuk","jf","xbrtspfttota","sngqvoijxuv","bztvaal","zxbshnrvbykjql","zz","mlvyoshiktodnsjj","qplci","lzqrxl","qxru","ygjtyzleizme","inx","lwhhjwsl","endjvxjyghrveu","phknqtsdtwxcktmw","wsdthzmlmbhjkm","u","pbqurqfxgqlojmws","mowsjvpvhznbsi","hdkbdxqg","ge","pzchrgef","ukmcowoe","nwhpiid","xdnnl","n","yjyssbsoc","cdzcuunkrf","uvouaghhcyvmlk","aajpfpyljt","jpyntsefxi","wjute","y","pbcnmhf","qmmidmvkn","xmywegmtuno","vuzygv","uxtrdsdfzfssmel","odjgdgzfmrazvnd","a","rdkugsbdpawxi","ivd","bbqeonycaegxfj","lrfkraoheucsvpi","eqrswgkaaaohxx","hqjtkqaqh","berbpmglbjipnuj","wogwczlkyrde","aqufowbig","snjniegvdvotu","ocedkt","bbufnxorixibbd","rzuqsyr","qghoy","evcuanuujszitaoa","wsx","glafbwzdd","znrvjqeyqi","npitruijvyllsi","objltu","ryp","nvybsfrxtlfmp","id","zoolzslgd","owijatklvjzscizr","upmsoxftumyxifyu","xucubv","fctkqlroq","zjv","wzi","ppvs","mflvioemycnphfjt","nwedtubynsb","repgcx","gsfomhvpmy","kdohe","tyycsibbeaxn","wjkfvabn","llkmagl","thkglauzgkeuly","paeurdvexqlw","akdt","ihmfrj","janxk","rqdll","cyhbsuxnlftmjc","yybwsjmajbwtuhkk","ovytgaufpjl","iwbnzhybsx","mumbh","jqmdabmyu","br","lwstjkoxbczkj","vhsgzvwiixxaob","fso","qnebmfl","ooetjiz","lq","msxphqdgz","mqhoggvrvjqrp","xbhkkfg","zxjegsyovdrmw","jav","mshoj","ax","biztkfomz","hujdmcyxdqteqja","gqgsomonv","reqqzzpw","lihdnvud","lznfhbaokxvce","fhxbldylqqewdnj","rlbskqgfvn","lfvobeyolyy","v","iwh","fpbuiujlolnjl","gvwxljbo","ypaotdzjxxrsc","mwrvel","umzpnoiei","ogwilaswn","yw","egdgye","hsrznlzrf","mwdgxaigmxpy","yaqgault","dtlg","cyvfiykmkllf","zxqyhvizqmamj","lvvgoifltzywueyp","abinmy","ppzaecvmx","qsmzc","iddymnl","uskihek","evxtehxtbthq","jvtfzddlgch","czohpyewf","ufzazyxtqxcu","brxpfymuvfvs","xrrcfuusicc","aqhlswbzievij","rv","udvmara","upityz","fecd","suxteeitxtg","dfuydrtbfypbn","cypqodxr","wikfuxwjht","jrliuaifpp","vkmxys","wvpfyfpkvgthq","rmajxis","jncxgviyu","av","nmhskodmidaj","lkfrimprrhen","uip","hstyopbvuiqc","p","vwduwmjpblqo","fnxwgqtvwztje","xwnbcuggl","iehimvoymyjasin","spsqiu","flhyfac","mqrbq","pstsxhplrrmbeddv","hnegtuxx","alsyxezjwtlwmxv","jtxytykkcku","bhhlovgcx","xhhivxnutkx","had","aysulvk","m","anhsyxli","jdkgfc","potn","lcibpxkidmwexp","gwoxjicdkv","tltienw","ngiutnuqbzi","o","tzlyb","vumnwehj","os","np","lhv","uzvgyeette","ipfvr","lpprjjalchhhcmh","k","pciulccqssaqgd","tp","dmzdzveslyjad","wtsbhgkd","eouxbldsxzm","vhtonlampljgzyve","xhnlcrldtfthul","xhflc","upgei","rlaks","yfqvnvtnqspyjbxr","phouoyhvls","voibuvbhhjcdflvl","rgorfbjrofokggaf","dqhqats","zchpicyuawpovm","yzwfor","koat","pybf","fhdzsbiyjld","gznfnqydisn","xz","po","tcjup","wygsnxk","kqlima","fgxnuohrnhg","publurhztntgmimc","zuufzphd","iucrmmmjqtcey","wnnbq","rghzyz","ukjqsjbmp","mdtrgv","vyeikgjdnml","kxwldnmi","apzuhsbssaxj","tkbkoljyodlipof","nkq","ktwtj","vgmkgjwle","t","agylw","vomtuy","jbtvitkqn","vtdxwrclpspcn","rdrls","yxfeoh","upj","myctacn","fdnor","ahqghzhoqprgkym","phiuvdv","jp","fdgpouzjwbq","hqoyefmugjvewhxu","qfzwuwe","fnsbijkeepyxry","oja","qthkcij","zpmqfbmnr","ybaibmzonzqlnmd","svo","gjftyfehik","jfrfgznuaytvaegm","aljhrx","odjq","ogwaxrssjxgvnka","zaqswwofedxj","lugpktauixp","dc","odknlbvxrs","jeobu","vqythyvzxbcgrlbg","hwc","erpbaxq","ujxcxck","rrklkb","wlrwyuy","zmg","yyhga","xwdbycdu","htedgvsrhchox","wr","suhesetv","jonqwhkwezjvjgg","sqqyrxtjkcalswq","hvyimhe","pjzdkmoue","zbphmgoxq","lbdlcumdgixjbcq","ztzdjqmadthtdmv","qcagsyqggcf","if","jpjxcjyi","chyicqibxdgkqtg","iwpdklhum","wljmg","micmun","npdbamofynykqv","ijsnfkpfy","lmq","oyjmeqvhcrvgm","mqopusqktdthpvz","fz","r","qbsqtipq","nxtsnason","xbpipyhh","topsuqomfjrd","islif","gbndakaq","bwnkxnwpzeoohlx","hrtbfnq","fguvomeepxoffg","mat","dzfpfnwbfuj","onlvy","cwcchvsasdylb","rxfcztzqopdi","ybrhodjn","oqkijy","ncvrjo","dphbfaal","xgtpdtkz","sebevsopjvciwljf","rcumyacqdapwczen","mabkapuoud","pbozezeygljfftvy","bvazmzbndl","vl","qiaixdtbhqvlzd","ffjfb","svthrfmkoxbho","cvet","ucgqyvopafyttrh","lbgihet","naiqyufxffdw","vruh","uz","ukffmudygjavem","dccamymhp","wofwgjkykm","fbuujzxhln","kmm","lzandlltowjpwsal","fapfvrmezbsjxs","wiw","sc","soqlh","hzaplclkwl","gcdqbcdwbwa","gadgt","pgowefka","juffuguqepwnfh","nbuinl","cpdxf","sox","fq","lfnrhgsxkhx","xrcorfygjxpi","mwtqjwbhgh","loc","fkglorkkvx","nlzdhucvayrz","azefobxutitrf","rlrstkcbtikklmh","ggk","sbphcejuylh","nraoenhd","zngyodiqlchxyycx","rrbhfwohfv","krzolrglgn","cpjesdzy","yoifoyg","hqqevqjugi","ahmv","xgaujnyclcjq","evhyfnlohavrj","byyvhgh","hyw","kedhvwy","ysljsqminajfipds","rglnpxfqwu","cibpynkxg","su","mbntqrlwyampdg","nig","ldhlhqdyjcfhu","jfymrbafmyoc","tyjmnhlfnrtz","dlazixtlxyvm","fbiguhsfuqo","rhymsno","rkbdlchs","ocbbwwd","astaiamnepwkya","mplirup","edkxjq","g","exlwulswtvot","tlnc","vnrrzerz","ygeraoozbtt","yyifkin","eo","ua","qgztvqdolf","rlzddjzcshvd","khxkdxflwxme","kk","zylbhoaac","cw","iizic","gcdxstpz","kjwdqeg","earjrncmmkdel","kbesuhquepj","nrzbllldgdmyrpgl","hllwnqozf","djpchowhwevbqvjj","zsmhylnjpktb","pxnktxkm","fxwiaqqb","qjwufmwresfsfaok","aa","d","iobioqm","svjgzk","khbzp","euexyudhrioi","yqsj","ngrwqpoh","rwuvd","eruffmlg","bxzovyew","faz","pmvfvyguqdi","jlxnoixsy","hyfrdngjf","ly","eibcapetpmeaid","tpnwwiif","pfgsp","kvhhwkzvtvlhhb","pjxurgqbtldims","rncplkeweoirje","akyprzzphew","wyvfpjyglzrmhfqp","ubheeqt","rmbxlcmn","taqakgim","apsbu","khwnykughmwrlk","vtdlzwpbhcsbvjno","tffmjggrmyil","schgwrrzt","mvndmua","nlwpw","glvbtkegzjs","piwllpgnlpcnezqs","xkelind","urtxsezrwz","zechoc","vfaimxrqnyiq","ybugjsblhzfravzn","btgcpqwovwp","zgxgodlhmix","sfzdknoxzassc","wgzvqkxuqrsqxs","dwneyqisozq","fg","vhfsf","uspujvqhydw","eadosqafyxbmzgr","tyff","blolplosqnfcwx","uwkl","puenodlvotb","iizudxqjvfnky","cjcywjkfvukvveq","jrxd","igwb","dftdyelydzyummmt","uvfmaicednym","oai","higfkfavgeemcgo","naefganqo","iqebfibigljbc","ulicojzjfrc","igxprunj","cymbrl","fqmwciqtynca","zjyagi","mzuejrttefhdwqc","zyiurxvf","wrjxffzbjexsh","wrxw","mhrbdxjwi","htknfa","wfrvxqdkhbwwef","vqsghhhutdget","cwupzrts","hbjnb","wpccoa","nx","howbzhaoscgyk","bilt","wqqatye","zceuuwg","jxzon","kkfj","bwsezd","ifdegsyjtswselk","xweimxlnzoh","tqthlftjblnpht","ww","ss","b","jmruuqscwjp","nxbk","wd","cqkrtbxgzg","xhppcjnq","cfq","tkkolzcfi","wblxki","ijeglxsvc","kcqjjwcwuhvzydm","gubqavlqffhrzz","hiwxrgftittd","caybc","ncsyjlzlxyyklc","poxcgnexmaajzuha","dhaccuualacyl","mtkewbprs","oncggqvr","sqqoffmwkplsgbrp","ioajuppvqluhbdet","dzwwzaelmo","afumtqugec","wglucmugwqi","zveswrjevfz","nxlbkak","pzcejvxzeoybb","fd","vewj","ivws","zjhudtpqsfc","zcmukotirrxx","zksmx","umofzhhowyftz","zbotrokaxaryxlk","ueolqk","dxmzhoq","zvu","cjl","esfmqgvxwfy","npbep","vbgjtbv","poeugoqynkbfiv","fewjjscjrei","yqssxzsydgllfzmo","urxkwcypctjkabi","wqtldwhjouas","tovdtkr","onzgeyddkqwuhnim","ffxviyvsktqrfa","qujhd","pvcz","hiyjlkxmeplnrvxg","hdykehkefp","vepcxhozpjxtreyn","liguhuxudbnh","f","ordxzm","klgohcmmbukz","yrmooliaobbnlap","dutnbetocxylcey","ywdsjegd","cr","blbxhjsgcuoxmqft","ngzdc","srfyjjumcbxole","dazwzwtdjoyuqeqj","xazjarqgfm","fxyfqbeoktcc","qrsjchxp","iltaqzawhgu","sgenjcfxr","yfikp","dvwhbyumthkiktb","walsx","jyajrkcvysicisab","brdeumb","tviihjwxdcz","dnrrgmem","ydgxlrjzucxyid","cdvdpvjlagwmg","ngnpxjkxims","gvyhnchlimsxc","w","jtizpezjl","qe","rjzv","vhnqvi","qm","iedzqswrsnfmnn","lt","utqfcqyrrwm","wtelvsqrru","fjwrhjcrtbcytn","qmqxceuohpiffaq","rmoybqjjgdyo","pmxttqftypfexlv","tg","qa","iqbqjlnpbf","kgaynkddbzllecd","tccvslp","curkxfoimnw","fvnyqkzlheruxr","iiygnzfov","coqs","oa","eiu","vzemmxtklis","lxu","nrwsjaxzwmh","tdayz","oxbbemejgosgcynf","ykbcn","hesvnctfvdsp","ku","rjhykpadahbhj","at","sxlngbtxmqr","wqrom","qzyabzrco","rbbyklndcqdj","cnsmgmwmpbgjq","krvnaf","qrwfajnfahyqocdb","fnlaozmff","vmoymbmytjvfcgt","cijyy","jdgwjbztl","swmalgbgpaplqgz","hfl","typttkrpfvx","tkzpzrscwbx","bwfqqvjcukjbsg","nxqmxr","x","eyavnz","il","dhthp","eyelg","npsoqsw","reogbmveofvusdsx","jvdrjkhxkq","qzjbrpljwuzpl","czqeevvbvcwh","vzuszqvhlmapty","yu","yldwwgezlqur","vorxwgdtgjilgydq","pknt","bgihl","ckorgrm","ixylxjmlfv","bpoaboylced","zea","igfagitkrext","ipvqq","dmoerc","oqxbypihdv","dtjrrkxro","rexuhucxpi","bvmuyarjwqpcoywa","qwdmfpwvamisns","bhopoqdsref","tmnm","cre","ktrniqwoofoeenbz","vlrfcsftapyujmw","updqikocrdyex","bcxw","eaum","oklsqebuzeziisw","fzgyhvnwjcns","dybjywyaodsyw","lmu","eocfru","ztlbggsuzctoc","ilfzpszgrgj","imqypqo","fump","sjvmsbrcfwretbie","oxpmplpcg","wmqigymr","qevdyd","gmuyytguexnyc","hwialkbjgzc","lmg","gijjy","lplrsxznfkoklxlv","xrbasbznvxas","twn","bhqultkyfq","saeq","xbuw","zd","kng","uoay","kfykd","armuwp","gtghfxf","gpucqwbihemixqmy","jedyedimaa","pbdrx","toxmxzimgfao","zlteob","adoshnx","ufgmypupei","rqyex","ljhqsaneicvaerqx","ng","sid","zagpiuiia","re","oadojxmvgqgdodw","jszyeruwnupqgmy","jxigaskpj","zpsbhgokwtfcisj","vep","ebwrcpafxzhb","gjykhz","mfomgxjphcscuxj","iwbdvusywqlsc","opvrnx","mkgiwfvqfkotpdz","inpobubzbvstk","vubuucilxyh","bci","dibmye","rlcnvnuuqfvhw","oorbyyiigppuft","swpksfdxicemjbf","goabwrqdoudf","yjutkeqakoarru","wuznnlyd","vfelxvtggkkk","mxlwbkbklbwfsvr","advraqovan","smkln","jxxvzdjlpyurxpj","ssebtpznwoytjefo","dynaiukctgrzjx","irzosjuncvh","hcnhhrajahitn","vwtifcoqepqyzwya","kddxywvgqxo","syxngevs","batvzmziq","mjewiyo","pzsupxoflq","byzhtvvpj","cqnlvlzr","akvmxzbaei","mwo","vg","ekfkuajjogbxhjii","isdbplotyak","jvkmxhtmyznha","lqjnqzrwrmgt","mbbhfli","bpeohsufree","ajrcsfogh","lucidbnlysamvy","tutjdfnvhahxy","urbrmmadea","hghv","acnjx","athltizloasimp","gu","rjfozvgmdakdhao","iephs","uztnpqhdl","rfuyp","crcszmgplszwfn","zihegt","xbspa","cjbmsamjyqqrasz","ghzlgnfoas","ljxl","cnumquohlcgt","jm","mfccj","hfedli","vtpieworwhyiucs","tdtuquartspkotm","pnkeluekvelj","ugrloq","zljmwt","fkyvqguqq","tpjidglpxqfxv","l","tvvimvroz","yy","opwyfovdz","pwlumocnyuoume","vjqpzkcfc","ihicd","dtttiixlhpikbv","goblttgvmndkqgg","gwsibcqahmyyeagk","prtvoju","lcblwidhjpu","kbu","pey","gkzrpc","bqajopjjlfthe","bc","lqs","zkndgojnjnxqsoqi","zyesldujjlp","drswybwlfyzph","xzluwbtmoxokk","bedrqfui","opajzeahv","lehdfnr","mnlpimduzgmwszc","velbhj","miwdn","wruqc","kscfodjxg","wcbm"]
    resultWordList = sol.findAllConcatenatedWordsInADict(words)
    resultWordList.sort()
    resultWordList.sort(key=lambda x: len(x))
    correctOutput = ["gfve","qfpd","lqdqrrcrwdnxeuo","hbsfyfv","ife","feclhbvfuk","ngbqqmbxqcqp","khhqr","dwfcayssyoqc","omwufbdfxu","ilebxwbcto","ta","hbuxhwadlpto","tpvo","phckcyufdqml","lfz","tgygdt","nhcvpf","shwywshtdgmb","bkkxcvg","monmwvytby","qtg","cwkuzyamnerp","ye","tfsrptug","gama","nberblt","mf","gttxwpuk","xbrtspfttota","qxru","phknqtsdtwxcktmw","pbqurqfxgqlojmws","hdkbdxqg","ge","ukmcowoe","xdnnl","yjyssbsoc","uvouaghhcyvmlk","pbcnmhf","qmmidmvkn","xmywegmtuno","vuzygv","uxtrdsdfzfssmel","eqrswgkaaaohxx","ocedkt","qghoy","wsx","glafbwzdd","ryp","nvybsfrxtlfmp","upmsoxftumyxifyu","xucubv","fctkqlroq","ppvs","nwedtubynsb","repgcx","gsfomhvpmy","kdohe","llkmagl","thkglauzgkeuly","paeurdvexqlw","akdt","rqdll","mumbh","br","fso","qnebmfl","lq","xbhkkfg","ax","gqgsomonv","reqqzzpw","rlbskqgfvn","lfvobeyolyy","mwrvel","ogwilaswn","yw","egdgye","yaqgault","dtlg","iddymnl","evxtehxtbthq","brxpfymuvfvs","rv","udvmara","fecd","dfuydrtbfypbn","cypqodxr","vkmxys","wvpfyfpkvgthq","av","vwduwmjpblqo","xwnbcuggl","flhyfac","mqrbq","pstsxhplrrmbeddv","hnegtuxx","bhhlovgcx","had","aysulvk","potn","os","np","lhv","uzvgyeette","tp","wtsbhgkd","eouxbldsxzm","xhnlcrldtfthul","xhflc","rlaks","phouoyhvls","dqhqats","koat","pybf","po","wygsnxk","kqlima","fgxnuohrnhg","wnnbq","mdtrgv","nkq","agylw","vomtuy","vtdxwrclpspcn","rdrls","yxfeoh","myctacn","fdnor","qfzwuwe","svo","dc","odknlbvxrs","hwc","erpbaxq","rrklkb","wlrwyuy","yyhga","xwdbycdu","htedgvsrhchox","wr","suhesetv","qcagsyqggcf","wljmg","npdbamofynykqv","lmq","oyjmeqvhcrvgm","nxtsnason","gbndakaq","hrtbfnq","fguvomeepxoffg","mat","onlvy","cwcchvsasdylb","dphbfaal","mabkapuoud","vl","ffjfb","svthrfmkoxbho","cvet","ucgqyvopafyttrh","vruh","ukffmudygjavem","dccamymhp","kmm","sc","soqlh","gcdqbcdwbwa","gadgt","pgowefka","cpdxf","sox","fq","lfnrhgsxkhx","loc","fkglorkkvx","ggk","nraoenhd","rrbhfwohfv","yoifoyg","ahmv","byyvhgh","hyw","kedhvwy","rglnpxfqwu","su","mbntqrlwyampdg","jfymrbafmyoc","rhymsno","rkbdlchs","ocbbwwd","exlwulswtvot","tlnc","eo","ua","khxkdxflwxme","kk","cw","pxnktxkm","aa","ngrwqpoh","rwuvd","eruffmlg","bxzovyew","hyfrdngjf","ly","pfgsp","akyprzzphew","ubheeqt","rmbxlcmn","apsbu","khwnykughmwrlk","mvndmua","nlwpw","btgcpqwovwp","sfzdknoxzassc","fg","vhfsf","tyff","blolplosqnfcwx","uwkl","puenodlvotb","naefganqo","cymbrl","wrxw","htknfa","wfrvxqdkhbwwef","vqsghhhutdget","wpccoa","nx","bilt","wqqatye","bwsezd","ww","ss","jmruuqscwjp","nxbk","wd","cfq","gubqavlqffhrzz","caybc","dhaccuualacyl","mtkewbprs","oncggqvr","sqqoffmwkplsgbrp","afumtqugec","nxlbkak","fd","ueolqk","esfmqgvxwfy","npbep","yqssxzsydgllfzmo","tovdtkr","hdykehkefp","ordxzm","dutnbetocxylcey","cr","ngzdc","fxyfqbeoktcc","walsx","brdeumb","dnrrgmem","gvyhnchlimsxc","qe","qm","lt","utqfcqyrrwm","wtelvsqrru","qmqxceuohpiffaq","pmxttqftypfexlv","tg","qa","tccvslp","coqs","oa","lxu","ykbcn","hesvnctfvdsp","ku","at","sxlngbtxmqr","wqrom","krvnaf","hfl","typttkrpfvx","nxqmxr","dhthp","eyelg","npsoqsw","reogbmveofvusdsx","yu","pknt","ckorgrm","bpoaboylced","dmoerc","bhopoqdsref","tmnm","cre","vlrfcsftapyujmw","bcxw","eaum","dybjywyaodsyw","lmu","eocfru","fump","oxpmplpcg","qevdyd","gmuyytguexnyc","lmg","lplrsxznfkoklxlv","twn","bhqultkyfq","saeq","xbuw","kng","uoay","kfykd","armuwp","gtghfxf","pbdrx","adoshnx","rqyex","ng","sid","re","vep","ebwrcpafxzhb","opvrnx","vubuucilxyh","rlcnvnuuqfvhw","goabwrqdoudf","wuznnlyd","vfelxvtggkkk","mxlwbkbklbwfsvr","advraqovan","smkln","kddxywvgqxo","syxngevs","mwo","vg","bpeohsufree","lucidbnlysamvy","urbrmmadea","hghv","gu","uztnpqhdl","rfuyp","xbspa","cnumquohlcgt","tdtuquartspkotm","ugrloq","fkyvqguqq","yy","pwlumocnyuoume","goblttgvmndkqgg","lcblwidhjpu","kbu","pey","bc","lqs","xzluwbtmoxokk","lehdfnr","wruqc","wcbm"]
    correctOutput.sort()
    correctOutput.sort(key=lambda x: len(x))
    # for i in range(30):
    #     print(correctOutput[i], end=" ")
    #     print(resultWordList[i])
    assert resultWordList == correctOutput
    words = ["cat","dog","catdog"]
    resultWordList = sol.findAllConcatenatedWordsInADict(words)
    resultWordList.sort()
    correctOutput = ["catdog"]
    correctOutput.sort()
    print(resultWordList)
    assert resultWordList == correctOutput
    words = ["rat", "dog", "cat", "cats"]
    myWordMap = Node(-1)
    for word in words:
        sol.addWordToWordMap(myWordMap, word)
    sol.prettyPrintWordMap(myWordMap)
    isConcatenated = sol.isWordConcatendated("dogcatsdog", myWordMap)
    print(isConcatenated)
    assert isConcatenated
    words = ['ca', 'cat', 'dog']
    myWordMap = Node(-1)
    for word in words:
        sol.addWordToWordMap(myWordMap, word)
    target = "cat"
    isWordConcat = sol.isWordConcatendated(target, myWordMap)
    print(isWordConcat)
    assert isWordConcat
    target = "catdog"
    isWordConcat = sol.isWordConcatendated(target, myWordMap)
    print(isWordConcat)
    assert isWordConcat
    target = "cadog"
    isWordConcat = sol.isWordConcatendated(target, myWordMap)
    print(isWordConcat)
    assert isWordConcat
    target = "cato"
    isWordConcat = sol.isWordConcatendated(target, myWordMap)
    print(isWordConcat)
    assert not isWordConcat

main()

'''
Data range/assumptions:
words length n: [1, 10^4]
word length: [1, 30]
Only lowercase letters
All strings unique
'''

'''
Tests:
n = 1
n = 10^4
all long words
all short words
no concatenated
all concatenated but one
concatenation of concatentation?
    E.g. cat, dog, catdog, catdogcatdog
        Is that last one a concatenation of the first words?
Words that have overlapping letters
    E.g. cad, dog
'''

'''
Ideas:

Naive:
    Arrange by length
    Create set of baseWords
    Add shortest to baseWords
    Maintain set length of words in baseWords
    for nextShortest:
        use counting algorithm below
        if not concatenated, add to base words

Word needs to be exact multiple of some combo of base word lengths to be possible to concatenate
    Try all combos of words whose sum is exactly equal to another word

Simpler problem: find if word is concatentation of a list of words
    Count instances of word
    Determine if covers full length?
    Time complexity:
        n: number of words
        k: length of words
        Naive search would need to do n * k
        But there has to be a faster way than that

Fast string search for multiple things:
    For each letter, can point nothing or multiple things
        E.g. cat, cato, dog, dave
            c -> cat, cato
            d -> dog, dave
    If part way into a word, still need to worry about the other words
        E.g. cad, dog
            c -> a -> d -> now need to think about other word too?
            cadog
                Has both in it, but they overlap
            Can we just go with the first one?

Counting method is flawed, e.g. cad, dog -> cadog
    Count would cover, but it's not exact
    Recursive split when two things share a letter?
        Cad -> og
        Dog -> ca
            But Those first letters didn't match anything in this solution
            So no need to continue

So, need to have an ongoing match or can quit early
If we have a completed match, but could go longer for a different word, need to split
    Just save the index to restart from

Need to create nested lists to represent words
    E.g. for ca, cad, dog, various levels
        1: c, d
        2: a, o
        3: empty, d, g
        4: empty, empty

Not just lists
    Nodes connecting to the next letters
    Letters can connect to different things
    If .next == None, match found

Have a current level, and if empty is found, then top level as well
    Instead of empty, link back to all the top level ones?

Time complexity of search:
    Each time we branch, need to pick one and store others
    E.g. ca, must pick d or anything in top level
    Terminate immediately if match found
        Doesn't matter if multiple concats possible
    Keep going until we don't have a match
    If frontier is empty, return False
    For large word set, could have a lot of branches
        Actually, no?
        We branch at two places:
            First letter
            If word is substring of another word
        But those branches can only go one place
            The next letter



Got working solution to hard problem without looking anything up
'''