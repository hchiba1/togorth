#!/usr/bin/perl -w
use strict;
use File::Basename;
use Getopt::Std;
my $PROGRAM = basename $0;
my $USAGE=
"Usage: $PROGRAM
";

my %OPT;
getopts('', \%OPT);

# print "\@prefix dct: <http://purl.org/dc/terms/> .\n";
print "\@prefix gene: <http://identifiers.org/ncbigene/> .\n";
print "\@prefix hop: <http://purl.org/net/orthordf/hOP/ontology#> .\n";
print "\n";

!@ARGV && -t and die $USAGE;
while (<>) {
    chomp;
    my @f = split("\t", $_);
    print "gene:$f[1]\n";
    print "    hop:symbol \"$f[2]\" ;\n";
    print "    hop:description \"$f[8]\" .\n";
    print "\n";
}
