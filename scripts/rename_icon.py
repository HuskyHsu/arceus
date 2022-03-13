import os

folder = r'D:\Project\arceus\src\assets\image\icon\\'

for file_name in os.listdir(folder):
    source = folder + file_name
    destination = source.replace('96px-Menu_LA_', '')

    os.rename(source, destination)

# import requests

# icon_list = [
#     "//archives.bulbagarden.net/media/upload/thumb/4/49/Menu_LA_722.png/96px-Menu_LA_722.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/98/Menu_LA_723.png/96px-Menu_LA_723.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/48/Menu_LA_724H.png/96px-Menu_LA_724H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e3/Menu_LA_155.png/96px-Menu_LA_155.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7d/Menu_LA_156.png/96px-Menu_LA_156.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e4/Menu_LA_157H.png/96px-Menu_LA_157H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/68/Menu_LA_501.png/96px-Menu_LA_501.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/25/Menu_LA_502.png/96px-Menu_LA_502.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4a/Menu_LA_503H.png/96px-Menu_LA_503H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/17/Menu_LA_399.png/96px-Menu_LA_399.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/73/Menu_LA_400.png/96px-Menu_LA_400.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3c/Menu_LA_396.png/96px-Menu_LA_396.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4f/Menu_LA_397.png/96px-Menu_LA_397.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/fe/Menu_LA_398.png/96px-Menu_LA_398.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/d9/Menu_LA_403.png/96px-Menu_LA_403.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e8/Menu_LA_404.png/96px-Menu_LA_404.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/43/Menu_LA_405.png/96px-Menu_LA_405.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bd/Menu_LA_265.png/96px-Menu_LA_265.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/2b/Menu_LA_266.png/96px-Menu_LA_266.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/74/Menu_LA_267.png/96px-Menu_LA_267.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b8/Menu_LA_268.png/96px-Menu_LA_268.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b1/Menu_LA_269.png/96px-Menu_LA_269.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e4/Menu_LA_077.png/96px-Menu_LA_077.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/1c/Menu_LA_078.png/96px-Menu_LA_078.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/6c/Menu_LA_133.png/96px-Menu_LA_133.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/59/Menu_LA_134.png/96px-Menu_LA_134.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/97/Menu_LA_135.png/96px-Menu_LA_135.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b9/Menu_LA_136.png/96px-Menu_LA_136.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0c/Menu_LA_196.png/96px-Menu_LA_196.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/76/Menu_LA_197.png/96px-Menu_LA_197.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/48/Menu_LA_470.png/96px-Menu_LA_470.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5b/Menu_LA_471.png/96px-Menu_LA_471.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3a/Menu_LA_700.png/96px-Menu_LA_700.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/77/Menu_LA_041.png/96px-Menu_LA_041.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/1b/Menu_LA_042.png/96px-Menu_LA_042.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/34/Menu_LA_169.png/96px-Menu_LA_169.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/1b/Menu_LA_425.png/96px-Menu_LA_425.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/43/Menu_LA_426.png/96px-Menu_LA_426.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/44/Menu_LA_401.png/96px-Menu_LA_401.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c6/Menu_LA_402.png/96px-Menu_LA_402.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9f/Menu_LA_418.png/96px-Menu_LA_418.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/13/Menu_LA_419.png/96px-Menu_LA_419.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/89/Menu_LA_412.png/96px-Menu_LA_412.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/d1/Menu_LA_412G.png/96px-Menu_LA_412G.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7c/Menu_LA_412S.png/96px-Menu_LA_412S.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b6/Menu_LA_413.png/96px-Menu_LA_413.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/ce/Menu_LA_413G.png/96px-Menu_LA_413G.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/39/Menu_LA_413S.png/96px-Menu_LA_413S.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/26/Menu_LA_414.png/96px-Menu_LA_414.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/8a/Menu_LA_074.png/96px-Menu_LA_074.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/25/Menu_LA_075.png/96px-Menu_LA_075.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/51/Menu_LA_076.png/96px-Menu_LA_076.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/2d/Menu_LA_234.png/96px-Menu_LA_234.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/8c/Menu_LA_899.png/96px-Menu_LA_899.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/aa/Menu_LA_446.png/96px-Menu_LA_446.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/92/Menu_LA_143.png/96px-Menu_LA_143.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/55/Menu_LA_046.png/96px-Menu_LA_046.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e1/Menu_LA_047.png/96px-Menu_LA_047.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/10/Menu_LA_172.png/96px-Menu_LA_172.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/ad/Menu_LA_025.png/96px-Menu_LA_025.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c9/Menu_LA_026.png/96px-Menu_LA_026.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/43/Menu_LA_063.png/96px-Menu_LA_063.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/95/Menu_LA_064.png/96px-Menu_LA_064.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bb/Menu_LA_065.png/96px-Menu_LA_065.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/fb/Menu_LA_390.png/96px-Menu_LA_390.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/eb/Menu_LA_391.png/96px-Menu_LA_391.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/09/Menu_LA_392.png/96px-Menu_LA_392.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/55/Menu_LA_427.png/96px-Menu_LA_427.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/47/Menu_LA_428.png/96px-Menu_LA_428.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/8a/Menu_LA_420.png/96px-Menu_LA_420.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5c/Menu_LA_421.png/96px-Menu_LA_421.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bb/Menu_LA_054.png/96px-Menu_LA_054.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/de/Menu_LA_055.png/96px-Menu_LA_055.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/2a/Menu_LA_415.png/96px-Menu_LA_415.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f0/Menu_LA_416.png/96px-Menu_LA_416.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/80/Menu_LA_123.png/96px-Menu_LA_123.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e5/Menu_LA_900.png/96px-Menu_LA_900.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/94/Menu_LA_212.png/96px-Menu_LA_212.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/10/Menu_LA_214.png/96px-Menu_LA_214.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/d8/Menu_LA_439.png/96px-Menu_LA_439.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f7/Menu_LA_122.png/96px-Menu_LA_122.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/04/Menu_LA_190.png/96px-Menu_LA_190.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/81/Menu_LA_424.png/96px-Menu_LA_424.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/86/Menu_LA_129.png/96px-Menu_LA_129.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ec/Menu_LA_130.png/96px-Menu_LA_130.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0c/Menu_LA_422.png/96px-Menu_LA_422.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/31/Menu_LA_422E.png/96px-Menu_LA_422E.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f6/Menu_LA_423.png/96px-Menu_LA_423.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/fb/Menu_LA_423E.png/96px-Menu_LA_423E.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/02/Menu_LA_211H.png/96px-Menu_LA_211H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b1/Menu_LA_904.png/96px-Menu_LA_904.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9c/Menu_LA_440.png/96px-Menu_LA_440.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/76/Menu_LA_113.png/96px-Menu_LA_113.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/34/Menu_LA_242.png/96px-Menu_LA_242.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/52/Menu_LA_406.png/96px-Menu_LA_406.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/31/Menu_LA_315.png/96px-Menu_LA_315.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/96/Menu_LA_407.png/96px-Menu_LA_407.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b2/Menu_LA_455.png/96px-Menu_LA_455.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c4/Menu_LA_548.png/96px-Menu_LA_548.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/11/Menu_LA_549H.png/96px-Menu_LA_549H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c3/Menu_LA_114.png/96px-Menu_LA_114.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/06/Menu_LA_465.png/96px-Menu_LA_465.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/63/Menu_LA_339.png/96px-Menu_LA_339.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/13/Menu_LA_340.png/96px-Menu_LA_340.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f0/Menu_LA_453.png/96px-Menu_LA_453.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/92/Menu_LA_454.png/96px-Menu_LA_454.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/be/Menu_LA_280.png/96px-Menu_LA_280.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/92/Menu_LA_281.png/96px-Menu_LA_281.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0a/Menu_LA_282.png/96px-Menu_LA_282.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b6/Menu_LA_475.png/96px-Menu_LA_475.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c9/Menu_LA_193.png/96px-Menu_LA_193.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4e/Menu_LA_469.png/96px-Menu_LA_469.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/31/Menu_LA_449.png/96px-Menu_LA_449.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ec/Menu_LA_450.png/96px-Menu_LA_450.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a7/Menu_LA_417.png/96px-Menu_LA_417.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a2/Menu_LA_434.png/96px-Menu_LA_434.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bb/Menu_LA_435.png/96px-Menu_LA_435.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/6b/Menu_LA_216.png/96px-Menu_LA_216.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7a/Menu_LA_217.png/96px-Menu_LA_217.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c6/Menu_LA_901.png/96px-Menu_LA_901.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c0/Menu_LA_704.png/96px-Menu_LA_704.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0b/Menu_LA_705H.png/96px-Menu_LA_705H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/ca/Menu_LA_706H.png/96px-Menu_LA_706H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/86/Menu_LA_095.png/96px-Menu_LA_095.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a7/Menu_LA_208.png/96px-Menu_LA_208.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f7/Menu_LA_111.png/96px-Menu_LA_111.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/49/Menu_LA_112.png/96px-Menu_LA_112.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/85/Menu_LA_464.png/96px-Menu_LA_464.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9c/Menu_LA_438.png/96px-Menu_LA_438.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5b/Menu_LA_185.png/96px-Menu_LA_185.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/15/Menu_LA_108.png/96px-Menu_LA_108.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/96/Menu_LA_463.png/96px-Menu_LA_463.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7d/Menu_LA_175.png/96px-Menu_LA_175.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/cc/Menu_LA_176.png/96px-Menu_LA_176.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/29/Menu_LA_468.png/96px-Menu_LA_468.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5f/Menu_LA_387.png/96px-Menu_LA_387.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/33/Menu_LA_388.png/96px-Menu_LA_388.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/85/Menu_LA_389.png/96px-Menu_LA_389.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/ac/Menu_LA_137.png/96px-Menu_LA_137.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/ce/Menu_LA_233.png/96px-Menu_LA_233.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/10/Menu_LA_474.png/96px-Menu_LA_474.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/fa/Menu_LA_092.png/96px-Menu_LA_092.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/06/Menu_LA_093.png/96px-Menu_LA_093.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/98/Menu_LA_094.png/96px-Menu_LA_094.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/ce/Menu_LA_442.png/96px-Menu_LA_442.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/65/Menu_LA_198.png/96px-Menu_LA_198.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/dd/Menu_LA_430.png/96px-Menu_LA_430.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e6/Menu_LA_201.png/96px-Menu_LA_201.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/57/Menu_LA_363.png/96px-Menu_LA_363.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/be/Menu_LA_364.png/96px-Menu_LA_364.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0c/Menu_LA_365.png/96px-Menu_LA_365.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/92/Menu_LA_223.png/96px-Menu_LA_223.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/d2/Menu_LA_224.png/96px-Menu_LA_224.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5d/Menu_LA_451.png/96px-Menu_LA_451.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/dd/Menu_LA_452.png/96px-Menu_LA_452.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f3/Menu_LA_058H.png/96px-Menu_LA_058H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/30/Menu_LA_059H.png/96px-Menu_LA_059H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/6d/Menu_LA_431.png/96px-Menu_LA_431.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a8/Menu_LA_432.png/96px-Menu_LA_432.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/d5/Menu_LA_066.png/96px-Menu_LA_066.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bd/Menu_LA_067.png/96px-Menu_LA_067.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3c/Menu_LA_068.png/96px-Menu_LA_068.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3a/Menu_LA_441.png/96px-Menu_LA_441.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/eb/Menu_LA_355.png/96px-Menu_LA_355.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bf/Menu_LA_356.png/96px-Menu_LA_356.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/bb/Menu_LA_477.png/96px-Menu_LA_477.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f6/Menu_LA_393.png/96px-Menu_LA_393.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a4/Menu_LA_394.png/96px-Menu_LA_394.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f6/Menu_LA_395.png/96px-Menu_LA_395.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c6/Menu_LA_458.png/96px-Menu_LA_458.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/36/Menu_LA_226.png/96px-Menu_LA_226.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a8/Menu_LA_550W.png/96px-Menu_LA_550W.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7d/Menu_LA_902.png/96px-Menu_LA_902.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b7/Menu_LA_902_f.png/96px-Menu_LA_902_f.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/81/Menu_LA_037.png/96px-Menu_LA_037.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4e/Menu_LA_037A.png/96px-Menu_LA_037A.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/18/Menu_LA_038.png/96px-Menu_LA_038.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/10/Menu_LA_038A.png/96px-Menu_LA_038A.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/fd/Menu_LA_072.png/96px-Menu_LA_072.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/84/Menu_LA_073.png/96px-Menu_LA_073.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3c/Menu_LA_456.png/96px-Menu_LA_456.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/21/Menu_LA_457.png/96px-Menu_LA_457.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/17/Menu_LA_240.png/96px-Menu_LA_240.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/73/Menu_LA_126.png/96px-Menu_LA_126.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a4/Menu_LA_467.png/96px-Menu_LA_467.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/ae/Menu_LA_081.png/96px-Menu_LA_081.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/81/Menu_LA_082.png/96px-Menu_LA_082.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/94/Menu_LA_462.png/96px-Menu_LA_462.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/2f/Menu_LA_436.png/96px-Menu_LA_436.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/08/Menu_LA_437.png/96px-Menu_LA_437.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e4/Menu_LA_239.png/96px-Menu_LA_239.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/57/Menu_LA_125.png/96px-Menu_LA_125.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/75/Menu_LA_466.png/96px-Menu_LA_466.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/48/Menu_LA_207.png/96px-Menu_LA_207.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3a/Menu_LA_472.png/96px-Menu_LA_472.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7a/Menu_LA_443.png/96px-Menu_LA_443.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/38/Menu_LA_444.png/96px-Menu_LA_444.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3d/Menu_LA_445.png/96px-Menu_LA_445.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/94/Menu_LA_299.png/96px-Menu_LA_299.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/30/Menu_LA_476.png/96px-Menu_LA_476.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/ca/Menu_LA_100H.png/96px-Menu_LA_100H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/c/c9/Menu_LA_101H.png/96px-Menu_LA_101H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/68/Menu_LA_479.png/96px-Menu_LA_479.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/53/Menu_LA_479O.png/96px-Menu_LA_479O.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ec/Menu_LA_479W.png/96px-Menu_LA_479W.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/94/Menu_LA_479R.png/96px-Menu_LA_479R.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/85/Menu_LA_479F.png/96px-Menu_LA_479F.png",
#     "//archives.bulbagarden.net/media/upload/thumb/b/b4/Menu_LA_479L.png/96px-Menu_LA_479L.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/ff/Menu_LA_433.png/96px-Menu_LA_433.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0a/Menu_LA_358.png/96px-Menu_LA_358.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/88/Menu_LA_200.png/96px-Menu_LA_200.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/54/Menu_LA_429.png/96px-Menu_LA_429.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/ae/Menu_LA_173.png/96px-Menu_LA_173.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e8/Menu_LA_035.png/96px-Menu_LA_035.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/96/Menu_LA_036.png/96px-Menu_LA_036.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/6a/Menu_LA_215H.png/96px-Menu_LA_215H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4a/Menu_LA_215.png/96px-Menu_LA_215.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/16/Menu_LA_903.png/96px-Menu_LA_903.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/96/Menu_LA_461.png/96px-Menu_LA_461.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4d/Menu_LA_361.png/96px-Menu_LA_361.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/6d/Menu_LA_362.png/96px-Menu_LA_362.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/95/Menu_LA_478.png/96px-Menu_LA_478.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/dc/Menu_LA_408.png/96px-Menu_LA_408.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9e/Menu_LA_409.png/96px-Menu_LA_409.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ee/Menu_LA_410.png/96px-Menu_LA_410.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/83/Menu_LA_411.png/96px-Menu_LA_411.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a1/Menu_LA_220.png/96px-Menu_LA_220.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/db/Menu_LA_221.png/96px-Menu_LA_221.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/1f/Menu_LA_473.png/96px-Menu_LA_473.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f5/Menu_LA_712.png/96px-Menu_LA_712.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/51/Menu_LA_713H.png/96px-Menu_LA_713H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/39/Menu_LA_459.png/96px-Menu_LA_459.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/6e/Menu_LA_460.png/96px-Menu_LA_460.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/48/Menu_LA_570H.png/96px-Menu_LA_570H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/81/Menu_LA_571H.png/96px-Menu_LA_571H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/74/Menu_LA_627.png/96px-Menu_LA_627.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/3a/Menu_LA_628H.png/96px-Menu_LA_628H.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ea/Menu_LA_447.png/96px-Menu_LA_447.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0a/Menu_LA_448.png/96px-Menu_LA_448.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/64/Menu_LA_480.png/96px-Menu_LA_480.png",
#     "//archives.bulbagarden.net/media/upload/thumb/1/14/Menu_LA_481.png/96px-Menu_LA_481.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/67/Menu_LA_482.png/96px-Menu_LA_482.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9c/Menu_LA_485.png/96px-Menu_LA_485.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9b/Menu_LA_486.png/96px-Menu_LA_486.png",
#     "//archives.bulbagarden.net/media/upload/thumb/2/21/Menu_LA_488.png/96px-Menu_LA_488.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/9e/Menu_LA_641.png/96px-Menu_LA_641.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ee/Menu_LA_641T.png/96px-Menu_LA_641T.png",
#     "//archives.bulbagarden.net/media/upload/thumb/d/d6/Menu_LA_642.png/96px-Menu_LA_642.png",
#     "//archives.bulbagarden.net/media/upload/thumb/f/f3/Menu_LA_642T.png/96px-Menu_LA_642T.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/77/Menu_LA_645.png/96px-Menu_LA_645.png",
#     "//archives.bulbagarden.net/media/upload/thumb/a/a8/Menu_LA_645T.png/96px-Menu_LA_645T.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/71/Menu_LA_905.png/96px-Menu_LA_905.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5c/Menu_LA_905T.png/96px-Menu_LA_905T.png",
#     "//archives.bulbagarden.net/media/upload/thumb/3/32/Menu_LA_483.png/96px-Menu_LA_483.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/e2/Menu_LA_483O.png/96px-Menu_LA_483O.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/72/Menu_LA_484.png/96px-Menu_LA_484.png",
#     "//archives.bulbagarden.net/media/upload/thumb/4/4c/Menu_LA_484O.png/96px-Menu_LA_484O.png",
#     "//archives.bulbagarden.net/media/upload/thumb/7/7b/Menu_LA_487.png/96px-Menu_LA_487.png",
#     "//archives.bulbagarden.net/media/upload/thumb/5/5e/Menu_LA_487O.png/96px-Menu_LA_487O.png",
#     "//archives.bulbagarden.net/media/upload/thumb/6/62/Menu_LA_493.png/96px-Menu_LA_493.png",
#     "//archives.bulbagarden.net/media/upload/thumb/0/0c/Menu_LA_489.png/96px-Menu_LA_489.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/89/Menu_LA_490.png/96px-Menu_LA_490.png",
#     "//archives.bulbagarden.net/media/upload/thumb/e/ef/Menu_LA_492.png/96px-Menu_LA_492.png",
#     "//archives.bulbagarden.net/media/upload/thumb/9/92/Menu_LA_492S.png/96px-Menu_LA_492S.png",
#     "//archives.bulbagarden.net/media/upload/thumb/8/80/Menu_LA_491.png/96px-Menu_LA_491.png"
# ]

# for icon_url in icon_list:
#     url = f'https:{icon_url}'
#     file_name = icon_url.split('/')[-1]
#     pic = requests.get(url)

#     open(f'../src/assets/image/icon/{file_name}', 'wb').write(pic.content)