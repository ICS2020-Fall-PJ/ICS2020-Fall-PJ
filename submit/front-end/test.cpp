#include <bits/stdc++.h>
using namespace std;
char s[2020];  FILE* fin;
void post(char* s){ FILE* f = fopen("test.in", "w"); fprintf(f, "%s\n", s); fclose(f); }
char* get(){ if (fscanf(fin, "%s", s) != 1) s[0] = '\0'; return s; }
void st_get(){ fin = fopen("test.out", "r"); }
void ed_get(){ fclose(fin); }
int main(){ return 0; }
