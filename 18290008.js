var canvas;
var gl;

var mTexCoords = [];
var mnormals = [];
var mvertices = [];

var tf = false;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var vertices = [ 
	0.174148 , 0.345293 , 0.193496
, 0.174148 , 0.372476 , 0.193496
, -0.174148 , 0.372476 , 0.193496
, -0.174148 , 0.345293 , 0.193496
, -0.132761 , 0.345293 , -0.198900
, -0.132761 , 0.372476 , -0.198900
, 0.132761 , 0.372476 , -0.198900
, 0.132761 , 0.345293 , -0.198900
, 0.188859 , 0.345293 , -0.135453
, 0.188859 , 0.372476 , -0.135453
, 0.193496 , 0.372476 , 0.174149
, 0.193496 , 0.345293 , 0.174149
, -0.193496 , 0.345293 , 0.174149
, -0.193496 , 0.372476 , 0.174149
, -0.188859 , 0.372476 , -0.135453
, -0.188859 , 0.345293 , -0.135453
, 0.159079 , 0.372476 , -0.185720
, 0.159079 , 0.345293 , -0.185720
, 0.179627 , 0.372476 , -0.164475
, 0.179627 , 0.345293 , -0.164475
, -0.179627 , 0.372476 , -0.164475
, -0.179627 , 0.345293 , -0.164475
, -0.159079 , 0.372476 , -0.185720
, -0.159079 , 0.345293 , -0.185720
, 0.187829 , 0.345293 , 0.187829
, 0.187829 , 0.372476 , 0.187829
, -0.187829 , 0.345293 , 0.187829
, -0.187829 , 0.372476 , 0.187829
, -0.159554 , 0.275653 , -0.156458
, -0.184846 , 0.275653 , -0.156458
, -0.184846 , 0.141308 , -0.165571
, -0.159554 , 0.141308 , -0.165571
, -0.184846 , 0.275653 , -0.195924
, -0.159554 , 0.275653 , -0.195924
, -0.159554 , 0.141308 , -0.201722
, -0.184846 , 0.141308 , -0.201722
, -0.184846 , 0.000000 , -0.214654
, -0.159554 , 0.000000 , -0.214654
, -0.159554 , 0.000000 , -0.185918
, -0.184846 , 0.000000 , -0.185918
, -0.159554 , 0.406973 , -0.202951
, -0.159554 , 0.406973 , -0.162999
, -0.184846 , 0.406973 , -0.162999
, -0.184846 , 0.406973 , -0.202951
, -0.159554 , 0.857491 , -0.245516
, -0.159554 , 0.857491 , -0.221878
, -0.184846 , 0.857491 , -0.221878
, -0.184846 , 0.857491 , -0.245516
, -0.159554 , 0.347038 , 0.180502
, -0.184846 , 0.347038 , 0.180502
, -0.184846 , 0.000000 , 0.180502
, -0.159554 , 0.000000 , 0.180502
, -0.184846 , 0.347038 , 0.134330
, -0.159554 , 0.347038 , 0.134330
, -0.159554 , 0.000000 , 0.151766
, -0.184846 , 0.000000 , 0.151766
, -0.179757 , 0.318788 , -0.164206
, -0.166843 , 0.318788 , -0.164206
, -0.166843 , 0.318788 , 0.137869
, -0.179757 , 0.318788 , 0.137869
, -0.179757 , 0.347524 , -0.164206
, -0.179757 , 0.347524 , 0.137869
, -0.166843 , 0.347524 , -0.164206
, -0.166843 , 0.347524 , 0.137869
, 0.100121 , 0.879784 , -0.259162
, 0.100121 , 0.883241 , -0.227301
, 0.200242 , 0.884241 , -0.218089
, 0.200242 , 0.880783 , -0.249950
, 0.100121 , 0.843428 , -0.254019
, 0.193565 , 0.844428 , -0.244806
, 0.100121 , 0.846757 , -0.223342
, 0.193565 , 0.847757 , -0.214129
, -0.100121 , 0.883241 , -0.227301
, -0.200242 , 0.884241 , -0.218089
, -0.193565 , 0.847757 , -0.214129
, -0.100121 , 0.846757 , -0.223342
, -0.193565 , 0.844428 , -0.244806
, -0.100121 , 0.843428 , -0.254019
, -0.200242 , 0.880783 , -0.249950
, -0.100121 , 0.879784 , -0.259162
, 0.000000 , 0.882942 , -0.230053
, 0.000000 , 0.846459 , -0.226093
, 0.000000 , 0.843129 , -0.256771
, 0.000000 , 0.879485 , -0.261914
, 0.166884 , 0.318788 , -0.164206
, 0.179797 , 0.318788 , -0.164206
, 0.179797 , 0.318788 , 0.137869
, 0.166884 , 0.318788 , 0.137869
, 0.166884 , 0.347524 , -0.164206
, 0.166884 , 0.347524 , 0.137869
, 0.179797 , 0.347524 , -0.164206
, 0.179797 , 0.347524 , 0.137869
, 0.085696 , 0.442857 , -0.201557
, 0.085696 , 0.445319 , -0.178867
, 0.171392 , 0.446319 , -0.169654
, 0.171392 , 0.443856 , -0.192344
, 0.085696 , 0.408515 , -0.197830
, 0.171392 , 0.409514 , -0.188617
, 0.085696 , 0.410977 , -0.175140
, 0.171392 , 0.411977 , -0.165927
, -0.085696 , 0.445319 , -0.178867
, -0.171392 , 0.446319 , -0.169654
, -0.171392 , 0.411977 , -0.165927
, -0.085696 , 0.410977 , -0.175140
, -0.171392 , 0.409514 , -0.188617
, -0.085696 , 0.408515 , -0.197830
, -0.171392 , 0.443856 , -0.192344
, -0.085696 , 0.442857 , -0.201557
, 0.000000 , 0.445020 , -0.181618
, 0.000000 , 0.410678 , -0.177892
, 0.000000 , 0.408216 , -0.200581
, 0.000000 , 0.442558 , -0.204308
, 0.172319 , 0.318788 , 0.164549
, 0.172319 , 0.318788 , 0.177462
, -0.172319 , 0.318788 , 0.177462
, -0.172319 , 0.318788 , 0.164549
, 0.172319 , 0.347524 , 0.164549
, -0.172319 , 0.347524 , 0.164549
, 0.172319 , 0.347524 , 0.177462
, -0.172319 , 0.347524 , 0.177462
, -0.162206 , 0.318788 , -0.170740
, -0.162206 , 0.318788 , -0.183654
, 0.162206 , 0.318788 , -0.183654
, 0.162206 , 0.318788 , -0.170740
, -0.162206 , 0.347524 , -0.170740
, 0.162206 , 0.347524 , -0.170740
, -0.162206 , 0.347524 , -0.183654
, 0.162206 , 0.347524 , -0.183654
, 0.184849 , 0.275653 , -0.156458
, 0.159558 , 0.275653 , -0.156458
, 0.159558 , 0.141308 , -0.165571
, 0.184849 , 0.141308 , -0.165571
, 0.159558 , 0.275653 , -0.195924
, 0.184849 , 0.275653 , -0.195924
, 0.184849 , 0.141308 , -0.201722
, 0.159558 , 0.141308 , -0.201722
, 0.159558 , 0.000000 , -0.214654
, 0.184849 , 0.000000 , -0.214654
, 0.184849 , 0.000000 , -0.185918
, 0.159558 , 0.000000 , -0.185918
, 0.184849 , 0.406973 , -0.202951
, 0.184849 , 0.406973 , -0.162999
, 0.159558 , 0.406973 , -0.162999
, 0.159558 , 0.406973 , -0.202951
, 0.184849 , 0.857491 , -0.245516
, 0.184849 , 0.857491 , -0.221878
, 0.159558 , 0.857491 , -0.221878
, 0.159558 , 0.857491 , -0.245516
, 0.184849 , 0.347038 , 0.180502
, 0.159558 , 0.347038 , 0.180502
, 0.159558 , 0.000000 , 0.180502
, 0.184849 , 0.000000 , 0.180502
, 0.159558 , 0.347038 , 0.134330
, 0.184849 , 0.347038 , 0.134330
, 0.184849 , 0.000000 , 0.151766
, 0.159558 , 0.000000 , 0.151766
, 0.055957 , 0.849196 , -0.254543
, 0.055957 , 0.849196 , -0.236012
, 0.046171 , 0.442297 , -0.184164
, 0.046171 , 0.442248 , -0.200416
, -0.055957 , 0.849196 , -0.236012
, -0.046171 , 0.442297 , -0.184164
, -0.046171 , 0.442248 , -0.200416
, -0.055957 , 0.849196 , -0.254543
]; 

var normals = [ 
	0.015653 , 0.000000 , 0.999878
, -0.015653 , 0.000000 , 0.999878
, -0.045115 , 0.000000 , -0.998982
, 0.045115 , 0.000000 , -0.998982
, 0.999162 , 0.000000 , -0.040922
, 0.999995 , 0.000000 , 0.003186
, -0.999995 , 0.000000 , 0.003186
, -0.999162 , 0.000000 , -0.040922
, 0.591992 , 0.000000 , -0.805943
, 0.860349 , 0.000000 , -0.509706
, -0.860349 , 0.000000 , -0.509706
, -0.591992 , 0.000000 , -0.805943
, 0.382683 , 0.000000 , 0.923880
, 0.923880 , 0.000000 , 0.382684
, -0.923880 , 0.000000 , 0.382684
, -0.382683 , 0.000000 , 0.923880
, 0.000000 , -1.000000 , -0.000000
, 0.000000 , -1.000000 , 0.000000
, 0.000000 , 1.000000 , -0.000001
, 0.000000 , 1.000000 , -0.000000
, 0.000000 , 1.000000 , -0.000000
, 0.000000 , 1.000000 , 0.000000
, 0.000000 , 1.000000 , 0.000001
, 0.000000 , 1.000000 , 0.000001
, 0.000000 , 1.000000 , 0.000000
, 0.000000 , -1.000000 , -0.000000
, 0.000000 , -1.000000 , -0.000001
, 0.000000 , -1.000000 , 0.000001
, 0.000000 , -1.000000 , 0.000001
, 0.000000 , -1.000000 , 0.000003
, 0.000000 , -0.009682 , 0.999953
, 0.000000 , -0.106269 , 0.994337
, 0.000000 , -0.004625 , -0.999989
, 0.000000 , 0.067791 , -0.997700
, 0.000000 , -1.000000 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 0.000000 , 0.091131 , -0.995839
, -1.000000 , 0.000000 , 0.000000
, 0.000000 , -0.142521 , 0.989792
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 0.000000 , 0.111732 , 0.993738
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, 0.000000 , -0.084926 , -0.996387
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 0.000000 , 0.129590 , 0.991568
, 0.000000 , -0.094062 , -0.995566
, 0.000000 , 0.000000 , 1.000000
, 0.000000 , -0.050179 , -0.998740
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 0.000000 , -1.000000 , -0.000000
, 0.000000 , -1.000000 , -0.000000
, 0.000000 , -1.000000 , -0.000000
, 0.000000 , -1.000000 , -0.000000
, -1.000000 , 0.000001 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, -0.000000 , 0.994163 , -0.107888
, -0.000000 , 0.994163 , -0.107888
, 0.000001 , 0.994163 , -0.107888
, 0.000001 , 0.994163 , -0.107888
, 0.061008 , -0.144045 , -0.987689
, 0.060922 , -0.144035 , -0.987696
, 0.095232 , -0.148007 , -0.984391
, 0.095232 , -0.148007 , -0.984391
, -0.095309 , 0.116012 , 0.988665
, -0.061003 , 0.111934 , 0.991841
, -0.061003 , 0.111934 , 0.991841
, -0.000000 , -0.994163 , 0.107888
, -0.000001 , -0.994163 , 0.107887
, -0.000001 , -0.994163 , 0.107887
, -0.000000 , -0.994163 , 0.107888
, 0.061003 , 0.111934 , 0.991841
, 0.095309 , 0.116012 , 0.988665
, 0.061003 , 0.111934 , 0.991841
, 0.000001 , -0.994163 , 0.107887
, 0.000000 , -0.994163 , 0.107888
, 0.000000 , -0.994163 , 0.107888
, 0.000001 , -0.994163 , 0.107887
, -0.095232 , -0.148007 , -0.984391
, -0.095232 , -0.148007 , -0.984391
, -0.060922 , -0.144035 , -0.987696
, -0.061008 , -0.144045 , -0.987689
, -0.000001 , 0.994163 , -0.107886
, 0.000000 , 0.994163 , -0.107886
, 0.000000 , 0.994163 , -0.107886
, -0.000000 , 0.107888 , 0.994163
, -0.000000 , 0.107888 , 0.994163
, 0.000000 , -0.994163 , 0.107889
, 0.000000 , -0.994163 , 0.107889
, 0.000000 , -0.140076 , -0.990141
, 0.000000 , 0.994163 , -0.107887
, -0.000000 , 0.994163 , -0.107887
, 0.983850 , -0.177951 , 0.019312
, 0.983850 , -0.177951 , 0.019312
, 0.983850 , -0.177951 , 0.019312
, -0.983850 , -0.177952 , 0.019310
, -0.983850 , -0.177952 , 0.019310
, -0.983850 , -0.177952 , 0.019310
, -0.983850 , -0.177952 , 0.019310
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 0.000000 , 0.994163 , -0.107889
, 0.000000 , 0.994163 , -0.107888
, -0.000000 , 0.994163 , -0.107887
, 0.070043 , -0.107622 , -0.991721
, 0.070043 , -0.107622 , -0.991721
, 0.107510 , -0.107262 , -0.988401
, 0.107510 , -0.107262 , -0.988401
, -0.107510 , 0.107262 , 0.988401
, -0.070043 , 0.107622 , 0.991722
, -0.070043 , 0.107622 , 0.991721
, -0.000000 , -0.994163 , 0.107888
, 0.000000 , -0.994163 , 0.107889
, 0.000000 , -0.994163 , 0.107889
, 0.000000 , -0.994163 , 0.107888
, 0.070043 , 0.107622 , 0.991721
, 0.107510 , 0.107262 , 0.988401
, 0.107510 , 0.107262 , 0.988401
, 0.070043 , 0.107622 , 0.991721
, -0.000000 , -0.994163 , 0.107887
, 0.000000 , -0.994163 , 0.107888
, -0.000000 , -0.994163 , 0.107888
, -0.107509 , -0.107262 , -0.988401
, -0.107509 , -0.107262 , -0.988401
, -0.070043 , -0.107622 , -0.991721
, -0.070043 , -0.107622 , -0.991721
, 0.000000 , 0.994163 , -0.107886
, 0.000000 , 0.994163 , -0.107885
, -0.000000 , 0.994163 , -0.107886
, -0.000000 , 0.994163 , -0.107886
, 0.000000 , 0.107887 , 0.994163
, -0.000000 , 0.107887 , 0.994163
, -0.000000 , -0.994163 , 0.107888
, -0.000000 , -0.994163 , 0.107888
, 0.000000 , -0.107887 , -0.994163
, -0.000000 , 0.994163 , -0.107889
, 0.000000 , 0.994163 , -0.107889
, -0.000000 , -1.000000 , 0.000000
, 0.000000 , 0.000000 , -1.000000
, 0.000000 , -1.000000 , 0.000000
, 0.000000 , -1.000000 , 0.000000
, 0.000000 , 0.000000 , 1.000000
, 0.000000 , 0.000000 , 1.000000
, 0.000000 , -0.009682 , 0.999953
, 0.000000 , -0.106269 , 0.994337
, 1.000000 , -0.000000 , 0.000000
, 1.000000 , -0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , 0.000000 , 0.000000
, -1.000000 , 0.000000 , 0.000000
, -1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, 0.000000 , -0.142521 , 0.989792
, 1.000000 , 0.000000 , 0.000000
, 1.000000 , 0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, -1.000000 , -0.000000 , 0.000000
, 0.000000 , -0.050179 , -0.998740
, 0.999711 , -0.024036 , 0.000033
, 0.999711 , -0.024036 , 0.000033
, 0.999711 , -0.024036 , 0.000033
, 0.999711 , -0.024036 , 0.000033
, 0.000000 , 0.126400 , 0.991979
, 0.000000 , 0.126400 , 0.991979
, -0.999711 , -0.024036 , 0.000033
, -0.999711 , -0.024036 , 0.000033
, -0.999711 , -0.024036 , 0.000033
, 0.000000 , -0.131846 , -0.991270
, 0.000000 , -0.131846 , -0.991270
]; 

var textureCoords = [
	0.964423 , 0.359152
	, 0.986640 , 0.359152
	, 0.986640 , 0.643817
	, 0.964423 , 0.643817
	, 0.927144 , 0.056003
	, 0.949361 , 0.056003
	, 0.949361 , 0.273015
	, 0.927144 , 0.273015
	, 0.964423 , 0.081879
	, 0.986640 , 0.081879
	, 0.986640 , 0.334947
	, 0.964423 , 0.334947
	, 0.964423 , 0.668022
	, 0.986640 , 0.668022
	, 0.986640 , 0.921089
	, 0.964423 , 0.921089
	, 0.949361 , 0.297072
	, 0.927144 , 0.297072
	, 0.986639 , 0.032832
	, 0.986640 , 0.056989
	, 0.964423 , 0.056989
	, 0.964423 , 0.032832
	, 0.986640 , 0.945980
	, 0.964423 , 0.945980
	, 0.986640 , 0.970136
	, 0.964423 , 0.970136
	, 0.949361 , 0.031947
	, 0.927144 , 0.031947
	, 0.964423 , 0.347049
	, 0.986640 , 0.347049
	, 0.964423 , 0.655919
	, 0.986640 , 0.656015
	, 0.669839 , 0.067030
	, 0.361128 , 0.067030
	, 0.368673 , 0.043311
	, 0.662294 , 0.043311
	, 0.329595 , 0.331251
	, 0.022567 , 0.331250
	, 0.017936 , 0.320069
	, 0.334227 , 0.320069
	, 0.021726 , 0.067030
	, 0.330437 , 0.067030
	, 0.318413 , 0.335882
	, 0.033749 , 0.335882
	, 0.322892 , 0.043311
	, 0.029271 , 0.043311
	, 0.046065 , 0.025947
	, 0.306097 , 0.025947
	, 0.067575 , 0.015175
	, 0.284587 , 0.015175
	, 0.357338 , 0.320069
	, 0.673628 , 0.320069
	, 0.645499 , 0.025947
	, 0.385467 , 0.025947
	, 0.406977 , 0.015175
	, 0.623989 , 0.015175
	, 0.361969 , 0.331251
	, 0.668997 , 0.331251
	, 0.657815 , 0.335882
	, 0.373151 , 0.335882
	, 0.800491 , 0.262909
	, 0.779813 , 0.262948
	, 0.778308 , 0.154256
	, 0.798979 , 0.153763
	, 0.747361 , 0.262738
	, 0.726595 , 0.262527
	, 0.728278 , 0.151507
	, 0.748942 , 0.151858
	, 0.729278 , 0.014576
	, 0.730695 , 0.035200
	, 0.707322 , 0.036833
	, 0.705868 , 0.016208
	, 0.694175 , 0.262023
	, 0.698826 , 0.152901
	, 0.751297 , 0.035617
	, 0.774572 , 0.038174
	, 0.795251 , 0.037488
	, 0.725787 , 0.371235
	, 0.693293 , 0.368633
	, 0.799595 , 0.369478
	, 0.778935 , 0.368930
	, 0.746451 , 0.371309
	, 0.725794 , 0.741375
	, 0.706573 , 0.739566
	, 0.786334 , 0.740284
	, 0.765673 , 0.739551
	, 0.746451 , 0.741370
	, 0.487747 , 0.678448
	, 0.467076 , 0.678448
	, 0.467076 , 0.394812
	, 0.487747 , 0.394812
	, 0.429340 , 0.678448
	, 0.408695 , 0.677411
	, 0.422946 , 0.393775
	, 0.443590 , 0.394812
	, 0.424124 , 0.370319
	, 0.444769 , 0.371356
	, 0.525483 , 0.678448
	, 0.511233 , 0.394812
	, 0.229182 , 0.982798
	, 0.218628 , 0.982798
	, 0.218628 , 0.735910
	, 0.229182 , 0.735910
	, 0.252668 , 0.982798
	, 0.252668 , 0.735910
	, 0.195142 , 0.982798
	, 0.195142 , 0.735910
	, 0.301082 , 0.604823
	, 0.327240 , 0.606274
	, 0.327240 , 0.688857
	, 0.301271 , 0.686576
	, 0.271574 , 0.604993
	, 0.271971 , 0.681439
	, 0.357354 , 0.606336
	, 0.357023 , 0.683392
	, 0.382432 , 0.604915
	, 0.382828 , 0.681147
	, 0.327152 , 0.441180
	, 0.327069 , 0.358601
	, 0.356857 , 0.364037
	, 0.357256 , 0.441096
	, 0.381194 , 0.366258
	, 0.381590 , 0.442492
	, 0.270335 , 0.366073
	, 0.301102 , 0.360908
	, 0.300995 , 0.442661
	, 0.270731 , 0.442520
	, 0.327306 , 0.523731
	, 0.357308 , 0.523711
	, 0.382011 , 0.523698
	, 0.300994 , 0.523744
	, 0.271153 , 0.523759
	, 0.481016 , 0.347955
	, 0.507159 , 0.348790
	, 0.506187 , 0.379217
	, 0.481016 , 0.378414
	, 0.572308 , 0.378061
	, 0.546152 , 0.378061
	, 0.547124 , 0.347618
	, 0.572308 , 0.347618
	, 0.317140 , 0.982798
	, 0.306586 , 0.982798
	, 0.306586 , 0.735910
	, 0.317140 , 0.735910
	, 0.340626 , 0.982798
	, 0.340626 , 0.735910
	, 0.283100 , 0.982798
	, 0.283100 , 0.735910
	, 0.396610 , 0.915941
	, 0.415219 , 0.917174
	, 0.415219 , 0.987949
	, 0.396788 , 0.986062
	, 0.368368 , 0.916020
	, 0.368556 , 0.986238
	, 0.443555 , 0.917253
	, 0.443259 , 0.987914
	, 0.462167 , 0.916073
	, 0.461712 , 0.986082
	, 0.415397 , 0.775838
	, 0.415502 , 0.705145
	, 0.443534 , 0.705088
	, 0.443729 , 0.775882
	, 0.461985 , 0.706957
	, 0.462338 , 0.777088
	, 0.368862 , 0.706746
	, 0.397073 , 0.706986
	, 0.396784 , 0.777047
	, 0.368544 , 0.776898
	, 0.415384 , 0.846519
	, 0.443631 , 0.846554
	, 0.462354 , 0.846574
	, 0.396650 , 0.846496
	, 0.368404 , 0.846460
	, 0.056810 , 0.988213
	, 0.046256 , 0.988213
	, 0.046256 , 0.706538
	, 0.056810 , 0.706538
	, 0.080296 , 0.988213
	, 0.080296 , 0.706538
	, 0.022770 , 0.988213
	, 0.022770 , 0.706538
	, 0.144549 , 0.982877
	, 0.133995 , 0.982886
	, 0.133995 , 0.717741
	, 0.144549 , 0.717733
	, 0.168035 , 0.982859
	, 0.168035 , 0.717715
	, 0.110509 , 0.982904
	, 0.110509 , 0.717760
	, 0.835458 , 0.262897
	, 0.814783 , 0.262827
	, 0.816350 , 0.153685
	, 0.837008 , 0.154198
	, 0.888674 , 0.262477
	, 0.867909 , 0.262713
	, 0.866372 , 0.151815
	, 0.887038 , 0.151471
	, 0.884677 , 0.035172
	, 0.886117 , 0.014615
	, 0.909475 , 0.016250
	, 0.908035 , 0.036810
	, 0.916487 , 0.152869
	, 0.921094 , 0.261971
	, 0.840797 , 0.038112
	, 0.864071 , 0.035561
	, 0.820136 , 0.037420
	, 0.868772 , 0.371264
	, 0.836284 , 0.368880
	, 0.815617 , 0.369389
	, 0.921933 , 0.368597
	, 0.889436 , 0.371199
	, 0.868772 , 0.741330
	, 0.848693 , 0.739430
	, 0.828023 , 0.740118
	, 0.909505 , 0.739446
	, 0.889427 , 0.741336
	, 0.601359 , 0.676759
	, 0.580688 , 0.676759
	, 0.580688 , 0.393123
	, 0.601359 , 0.393123
	, 0.659740 , 0.675722
	, 0.639095 , 0.676759
	, 0.624845 , 0.393123
	, 0.645490 , 0.392086
	, 0.623666 , 0.369667
	, 0.644311 , 0.368630
	, 0.542952 , 0.676759
	, 0.557203 , 0.393123
	, 0.135251 , 0.687029
	, 0.120190 , 0.687028
	, 0.113139 , 0.351667
	, 0.126352 , 0.351667
	, 0.028722 , 0.687029
	, 0.037668 , 0.351667
	, 0.024447 , 0.351667
	, 0.013653 , 0.687029
	, 0.245571 , 0.687113
	, 0.154104 , 0.687113
	, 0.162102 , 0.351583
	, 0.237574 , 0.351583
];

var triangles = [
// indices for vertex1, textureCoord of vertex1, normal of vertex1, vertex2, ...
// each index starts from 1, we will probably need to subtract 1 from each
4,4,2 , 1,1,1 , 2,2,1
, 2,2,1 , 3,3,2 , 4,4,2
, 8,8,4 , 5,5,3 , 6,6,3
, 6,6,3 , 7,7,4 , 8,8,4
, 12,12,6 , 9,9,5 , 10,10,5
, 10,10,5 , 11,11,6 , 12,12,6
, 16,16,8 , 13,13,7 , 14,14,7
, 14,14,7 , 15,15,8 , 16,16,8
, 8,8,4 , 7,7,4 , 17,17,9
, 17,17,9 , 18,18,9 , 8,8,4
, 18,22,9 , 17,19,9 , 19,20,10
, 19,20,10 , 20,21,10 , 18,22,9
, 20,21,10 , 19,20,10 , 10,10,5
, 10,10,5 , 9,9,5 , 20,21,10
, 16,16,8 , 15,15,8 , 21,23,11
, 21,23,11 , 22,24,11 , 16,16,8
, 22,24,11 , 21,23,11 , 23,25,12
, 23,25,12 , 24,26,12 , 22,24,11
, 24,28,12 , 23,27,12 , 6,6,3
, 6,6,3 , 5,5,3 , 24,28,12
, 2,2,1 , 1,1,1 , 25,29,13
, 25,29,13 , 26,30,13 , 2,2,1
, 26,30,14 , 25,29,14 , 12,12,6
, 12,12,6 , 11,11,6 , 26,30,14
, 14,14,7 , 13,13,7 , 27,31,15
, 27,31,15 , 28,32,15 , 14,14,7
, 28,32,16 , 27,31,16 , 4,4,2
, 4,4,2 , 3,3,2 , 28,32,16
, 20,36,18 , 9,33,17 , 16,34,17
, 16,34,17 , 22,35,18 , 20,36,18
, 14,40,20 , 28,37,19 , 26,38,19
, 26,38,19 , 11,39,20 , 14,40,20
, 15,42,21 , 14,40,20 , 11,39,20
, 11,39,20 , 10,41,21 , 15,42,21
, 26,38,19 , 28,37,19 , 3,43,22
, 3,43,22 , 2,44,22 , 26,38,19
, 23,48,24 , 21,45,23 , 19,46,23
, 19,46,23 , 17,47,24 , 23,48,24
, 21,45,23 , 15,42,21 , 10,41,21
, 10,41,21 , 19,46,23 , 21,45,23
, 6,50,25 , 23,48,24 , 17,47,24
, 17,47,24 , 7,49,25 , 6,50,25
, 12,52,26 , 13,51,26 , 16,34,17
, 16,34,17 , 9,33,17 , 12,52,26
, 8,56,28 , 18,53,27 , 24,54,27
, 24,54,27 , 5,55,28 , 8,56,28
, 18,53,27 , 20,36,18 , 22,35,18
, 22,35,18 , 24,54,27 , 18,53,27
, 4,60,30 , 27,57,29 , 25,58,29
, 25,58,29 , 1,59,30 , 4,60,30
, 27,57,29 , 13,51,26 , 12,52,26
, 12,52,26 , 25,58,29 , 27,57,29
, 32,64,32 , 29,61,31 , 30,62,31
, 30,62,31 , 31,63,32 , 32,64,32
, 36,68,34 , 33,65,33 , 34,66,33
, 34,66,33 , 35,67,34 , 36,68,34
, 40,72,35 , 37,69,35 , 38,70,35
, 38,70,35 , 39,71,35 , 40,72,35
, 35,67,39 , 34,66,36 , 29,73,37
, 29,73,37 , 32,74,38 , 35,67,39
, 33,65,43 , 36,68,40 , 31,63,41
, 31,63,41 , 30,62,42 , 33,65,43
, 38,70,44 , 35,67,39 , 32,74,38
, 32,74,38 , 39,71,44 , 38,70,44
, 37,75,45 , 36,68,34 , 35,67,34
, 35,67,34 , 38,70,45 , 37,75,45
, 37,75,46 , 40,76,46 , 31,63,41
, 31,63,41 , 36,68,40 , 37,75,46
, 39,77,47 , 32,64,32 , 31,63,32
, 31,63,32 , 40,76,47 , 39,77,47
, 34,66,36 , 41,78,48 , 42,79,49
, 42,79,49 , 29,73,37 , 34,66,36
, 29,61,31 , 42,80,50 , 43,81,50
, 43,81,50 , 30,62,31 , 29,61,31
, 44,82,52 , 33,65,43 , 30,62,42
, 30,62,42 , 43,81,51 , 44,82,52
, 33,65,33 , 44,82,53 , 41,78,53
, 41,78,53 , 34,66,33 , 33,65,33
, 41,78,48 , 45,83,54 , 46,84,55
, 46,84,55 , 42,79,49 , 41,78,48
, 42,80,50 , 46,85,56 , 47,86,56
, 47,86,56 , 43,81,50 , 42,80,50
, 48,87,46 , 44,82,52 , 43,81,51
, 43,81,51 , 47,86,46 , 48,87,46
, 44,82,53 , 48,87,57 , 45,83,57
, 45,83,57 , 41,78,53 , 44,82,53
, 52,91,58 , 49,88,58 , 50,89,58
, 50,89,58 , 51,90,58 , 52,91,58
, 56,95,59 , 53,92,59 , 54,93,59
, 54,93,59 , 55,94,59 , 56,95,59
, 51,97,35 , 56,95,35 , 55,94,35
, 55,94,35 , 52,96,35 , 51,97,35
, 55,99,62 , 54,98,60 , 49,88,61
, 49,88,61 , 52,91,61 , 55,99,62
, 56,95,46 , 51,90,46 , 50,89,46
, 50,89,46 , 53,92,46 , 56,95,46
, 60,103,66 , 57,100,63 , 58,101,64
, 58,101,64 , 59,102,65 , 60,103,66
, 62,105,67 , 61,104,67 , 57,100,67
, 57,100,67 , 60,103,67 , 62,105,67
, 64,107,68 , 59,102,68 , 58,101,69
, 58,101,69 , 63,106,69 , 64,107,68
, 68,111,73 , 65,108,70 , 66,109,71
, 66,109,71 , 67,110,72 , 68,111,73
, 70,113,77 , 69,112,74 , 65,108,75
, 65,108,75 , 68,111,76 , 70,113,77
, 72,115,78 , 67,110,78 , 66,109,79
, 66,109,79 , 71,114,80 , 72,115,78
, 71,114,84 , 69,116,81 , 70,117,82
, 70,117,82 , 72,115,83 , 71,114,84
, 76,121,87 , 73,118,85 , 74,119,86
, 74,119,86 , 75,120,86 , 76,121,87
, 75,120,91 , 77,122,88 , 78,123,89
, 78,123,89 , 76,121,90 , 75,120,91
, 78,127,95 , 77,124,92 , 79,125,93
, 79,125,93 , 80,126,94 , 78,127,95
, 80,126,98 , 79,125,96 , 74,119,96
, 74,119,96 , 73,118,97 , 80,126,98
, 82,129,100 , 81,128,99 , 73,118,85
, 73,118,85 , 76,121,87 , 82,129,100
, 76,121,90 , 78,123,89 , 83,130,101
, 83,130,101 , 82,129,102 , 76,121,90
, 83,132,103 , 78,127,95 , 80,126,94
, 80,126,94 , 84,131,103 , 83,132,103
, 84,131,105 , 80,126,98 , 73,118,97
, 73,118,97 , 81,128,104 , 84,131,105
, 71,114,80 , 66,109,79 , 81,128,99
, 81,128,99 , 82,129,100 , 71,114,80
, 82,129,102 , 83,130,101 , 69,116,81
, 69,116,81 , 71,114,84 , 82,129,102
, 69,112,74 , 83,132,103 , 84,131,103
, 84,131,103 , 65,108,75 , 69,112,74
, 65,108,70 , 84,131,105 , 81,128,104
, 81,128,104 , 66,109,71 , 65,108,70
, 70,136,108 , 68,133,106 , 67,134,107
, 67,134,107 , 72,135,106 , 70,136,108
, 75,140,112 , 74,137,109 , 79,138,110
, 79,138,110 , 77,139,111 , 75,140,112
, 88,144,66 , 85,141,63 , 86,142,64
, 86,142,64 , 87,143,65 , 88,144,66
, 90,146,67 , 89,145,67 , 85,141,67
, 85,141,67 , 88,144,67 , 90,146,67
, 92,148,115 , 87,143,113 , 86,142,114
, 86,142,114 , 91,147,113 , 92,148,115
, 96,152,118 , 93,149,116 , 94,150,117
, 94,150,117 , 95,151,118 , 96,152,118
, 98,154,122 , 97,153,119 , 93,149,120
, 93,149,120 , 96,152,121 , 98,154,122
, 100,156,123 , 95,151,123 , 94,150,124
, 94,150,124 , 99,155,125 , 100,156,123
, 99,155,129 , 97,157,126 , 98,158,127
, 98,158,127 , 100,156,128 , 99,155,129
, 104,162,133 , 101,159,130 , 102,160,131
, 102,160,131 , 103,161,132 , 104,162,133
, 103,161,134 , 105,163,134 , 106,164,135
, 106,164,135 , 104,162,136 , 103,161,134
, 106,168,140 , 105,165,137 , 107,166,138
, 107,166,138 , 108,167,139 , 106,168,140
, 108,167,144 , 107,166,141 , 102,160,142
, 102,160,142 , 101,159,143 , 108,167,144
, 110,170,146 , 109,169,145 , 101,159,130
, 101,159,130 , 104,162,133 , 110,170,146
, 104,162,136 , 106,164,135 , 111,171,147
, 111,171,147 , 110,170,148 , 104,162,136
, 111,173,149 , 106,168,140 , 108,167,139
, 108,167,139 , 112,172,149 , 111,173,149
, 112,172,151 , 108,167,144 , 101,159,143
, 101,159,143 , 109,169,150 , 112,172,151
, 99,155,125 , 94,150,124 , 109,169,145
, 109,169,145 , 110,170,146 , 99,155,125
, 110,170,148 , 111,171,147 , 97,157,126
, 97,157,126 , 99,155,129 , 110,170,148
, 97,153,119 , 111,173,149 , 112,172,149
, 112,172,149 , 93,149,120 , 97,153,119
, 93,149,116 , 112,172,151 , 109,169,150
, 109,169,150 , 94,150,117 , 93,149,116
, 116,177,152 , 113,174,152 , 114,175,152
, 114,175,152 , 115,176,152 , 116,177,152
, 118,179,153 , 117,178,153 , 113,174,153
, 113,174,153 , 116,177,153 , 118,179,153
, 120,181,58 , 115,176,58 , 114,175,58
, 114,175,58 , 119,180,58 , 120,181,58
, 124,185,154 , 121,182,154 , 122,183,155
, 122,183,155 , 123,184,154 , 124,185,154
, 126,187,156 , 125,186,156 , 121,182,157
, 121,182,157 , 124,185,156 , 126,187,156
, 128,189,153 , 123,184,153 , 122,183,153
, 122,183,153 , 127,188,153 , 128,189,153
, 132,193,159 , 129,190,158 , 130,191,158
, 130,191,158 , 131,192,159 , 132,193,159
, 136,197,34 , 133,194,33 , 134,195,33
, 134,195,33 , 135,196,34 , 136,197,34
, 140,201,35 , 137,198,35 , 138,199,35
, 138,199,35 , 139,200,35 , 140,201,35
, 135,196,163 , 134,195,160 , 129,190,161
, 129,190,161 , 132,193,162 , 135,196,163
, 133,194,167 , 136,197,164 , 131,202,165
, 131,202,165 , 130,203,166 , 133,194,167
, 138,205,168 , 135,196,163 , 132,193,162
, 132,193,162 , 139,204,168 , 138,205,168
, 137,198,45 , 136,197,34 , 135,196,34
, 135,196,34 , 138,205,45 , 137,198,45
, 137,198,170 , 140,201,169 , 131,202,165
, 131,202,165 , 136,197,164 , 137,198,170
, 139,204,171 , 132,193,159 , 131,192,159
, 131,192,159 , 140,206,171 , 139,204,171
, 134,195,160 , 141,207,172 , 142,208,173
, 142,208,173 , 129,190,161 , 134,195,160
, 129,190,158 , 142,208,50 , 143,209,50
, 143,209,50 , 130,191,158 , 129,190,158
, 144,211,175 , 133,194,167 , 130,203,166
, 130,203,166 , 143,210,174 , 144,211,175
, 133,194,33 , 144,211,53 , 141,207,53
, 141,207,53 , 134,195,33 , 133,194,33
, 141,207,172 , 145,212,54 , 146,213,55
, 146,213,55 , 142,208,173 , 141,207,172
, 142,208,50 , 146,213,56 , 147,214,56
, 147,214,56 , 143,209,50 , 142,208,50
, 148,216,46 , 144,211,175 , 143,210,174
, 143,210,174 , 147,215,46 , 148,216,46
, 144,211,53 , 148,216,57 , 145,212,57
, 145,212,57 , 141,207,53 , 144,211,53
, 152,220,58 , 149,217,58 , 150,218,58
, 150,218,58 , 151,219,58 , 152,220,58
, 156,224,176 , 153,221,176 , 154,222,176
, 154,222,176 , 155,223,176 , 156,224,176
, 151,226,35 , 156,224,35 , 155,223,35
, 155,223,35 , 152,225,35 , 151,226,35
, 155,223,44 , 154,222,44 , 149,217,44
, 149,217,44 , 152,220,44 , 155,223,44
, 156,228,46 , 151,219,46 , 150,218,46
, 150,218,46 , 153,227,46 , 156,228,46
, 160,232,180 , 157,229,177 , 158,230,178
, 158,230,178 , 159,231,179 , 160,232,180
, 159,231,181 , 158,230,181 , 161,233,181
, 161,233,181 , 162,234,182 , 159,231,181
, 164,236,185 , 163,235,183 , 162,234,184
, 162,234,184 , 161,233,184 , 164,236,185
, 163,240,186 , 164,237,186 , 157,238,187
, 157,238,187 , 160,239,186 , 163,240,186


];

var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 0.0, 1.0, 0.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;

var modelView, projection;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
var theta =[0, 0, 0];

var thetaLoc;

var flag = true;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	gl.enable(gl.DEPTH_TEST);

	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	prepareTeapot();

	var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(mnormals), gl.STATIC_DRAW );
	
	var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(mvertices), gl.STATIC_DRAW);
	
	var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition);

	var tBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mTexCoords), gl.STATIC_DRAW);
	
	var vTexCoords = gl.getAttribLocation( program, "vTexCoords");
    gl.vertexAttribPointer( vTexCoords, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vTexCoords );
	
	var texSize = 64;
    var numRows = 8;
    var numCols = 8;

    var myTexels = new Uint8Array(4*texSize*texSize);
    
    for (var i=0; i< texSize; ++i){
        for (var j=0; j<texSize; ++j){
            var patchx = Math.floor(i/(texSize/numRows));
            var patchy = Math.floor(j/(texSize/numCols));
            var c = (patchx%2 !== patchy%2 ? 255 : 0);
            myTexels[4*i*texSize+4*j]=c;
            myTexels[4*i*texSize+4*j+1]=c;
            myTexels[4*i*texSize+4*j+2]=c;
            myTexels[4*i*texSize+4*j+3]=255;

        }
	}
	
	var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0 ,gl.RGBA, gl.UNSIGNED_BYTE, myTexels);
    gl.generateMipmap( gl.TEXTURE_2D);
    gl.uniform1i(gl.getUniformLocation(program, "texMap"), 0);
	
	thetaLoc = gl.getUniformLocation(program, "theta");

	modelViewMatrix = rotateX(0);
	projectionMatrix = ortho(-1.0, 1.0, -1.0, 1.0, -20.0, 20.0);
	
	modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix));
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix));
	

	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

    document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
	document.getElementById("ButtonT").onclick = function(){flag = !flag;};
	document.getElementById("ButtonWire").onclick = function(event){
		switch( event.target.index ) {
		case 0:
			tf = true;
			break;
		case 1:
			tf = false;
			break;
		}
	};

	gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program,
       "shininess"),materialShininess);

	render();
};


function prepareTeapot() {
	for (var i = 0; i < triangles.length; i+=9) {
		addTriangleVertexForIndices(triangles[i]-1, triangles[i+1]-1, triangles[i+2]-1);
        addTriangleVertexForIndices(triangles[i+3]-1, triangles[i+4]-1, triangles[i+5]-1);
        addTriangleVertexForIndices(triangles[i+6]-1, triangles[i+7]-1, triangles[i+8]-1); 
	}
}

function addTriangleVertexForIndices(vIndex, tIndex, nIndex){
    mvertices.push(vertices[3*vIndex], vertices[3*vIndex+1], vertices[3*vIndex+2]);
    mTexCoords.push(textureCoords[2*tIndex], textureCoords[2*tIndex+1]);
    mnormals.push(normals[3*nIndex], normals[3*nIndex+1], normals[3*nIndex+2]);
}

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	   
	if(flag) theta[axis] += 1.5;

    modelView = mat4();
    modelView = mult(modelView, rotate(theta[xAxis], [1, 0, 0] ));
    modelView = mult(modelView, rotate(theta[yAxis], [0, 1, 0] ));
	modelView = mult(modelView, rotate(theta[zAxis], [0, 0, 1] ));
	
	gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelView) );

	if(tf == false)
		gl.drawArrays(gl.TRIANGLES, 0, (mvertices.length)/3 );
		
	else{
		gl.drawArrays( gl.LINES, 0, (mvertices.length)/3 );
	}


    requestAnimFrame(render);
}