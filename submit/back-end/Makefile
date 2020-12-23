CC=gcc
CFLAGS=-Wall -O2

PIPE=./main
STDPIPE=psim/psim

YOFILES = abs-asum-cmov.yo  asumr.yo  j-cc.yo     prog1.yo  prog4.yo  prog7.yo  pushquestion.yo abs-asum-jmp.yo   asum.yo   poptest.yo  prog2.yo  prog5.yo  prog8.yo  pushtest.yo asumi.yo          cjr.yo    prog10.yo   prog3.yo  prog6.yo  prog9.yo  ret-hazard.yo

HONOR_YOFILES = ex32.yo ex33.yo INS1.yo INS2.yo INS3.yo INS4.yo load_forward.yo memtest.yo overflow1.yo overflow.yo

PIPEFILES = abs-asum-cmov.pipe  asumr.pipe  j-cc.pipe     prog1.pipe  prog4.pipe  prog7.pipe  pushquestion.pipe abs-asum-jmp.pipe   asum.pipe   poptest.pipe  prog2.pipe  prog5.pipe  prog8.pipe  pushtest.pipe asumi.pipe          cjr.pipe    prog10.pipe   prog3.pipe  prog6.pipe  prog9.pipe  ret-hazard.pipe

HONOR_PIPEFILES = ex32.pipe ex33.pipe INS1.pipe INS2.pipe INS3.pipe INS4.pipe load_forward.pipe memtest.pipe overflow1.pipe overflow.pipe 

ifeq ($(h), 1)
	ifeq ($(s), 1)
		CMD=$(STDPIPE) -t $*.yo > $*.pipe && grep "ISA Check" $*.pipe
		DSTPATH=std_pipe_honor
	else 
		CMD=$(PIPE) < $*.yo > $*.pipe
		DSTPATH=my_pipe_honor
	endif
	SRCPATH=y86-code-honor
	FYO=$(HONOR_YOFILES)
	FPIPE=$(HONOR_PIPEFILES)
else 
	ifeq ($(s), 1)
		CMD=$(STDPIPE) -t $*.yo > $*.pipe && grep "ISA Check" $*.pipe
		DSTPATH=std_pipe
	else 
		CMD=$(PIPE) < $*.yo > $*.pipe
		DSTPATH=my_pipe
	endif
	SRCPATH=y86-code
	FYO=$(YOFILES)
	FPIPE=$(PIPEFILES)
endif

pre:
	g++ main.cpp -o main -g 
	cp $(SRCPATH)/*.yo . 

run: pre $(FYO) $(FPIPE)
	#mv *.pipe $(DSTPATH)/
	rm *.yo
	rm *.pipe
	
%.pipe:
	$(CMD)
	cp *.pipe $(DSTPATH)/
	
	
clean:
	rm -f *.o *.yis *~ *.yo *.pipe *.seq *.seq+ core
