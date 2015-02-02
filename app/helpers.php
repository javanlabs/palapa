<?php

function case_deadline($day)
{
    if($day >= 0)
    {
        if($day == 0)
        {
            return '<span class="label label-warning">hari ini</span>';
        }
        elseif($day == 1)
        {
            return '<span class="label label-warning">hari ini</span>';
        }
        else
        {
            return '<span class="label label-success">' . $day . " hari lagi" . '</span>';
        }
    }
    else
    {
        return '<span class="label label-danger">' . "lewat " . abs($day) . " hari" . '</span>';
    }

}