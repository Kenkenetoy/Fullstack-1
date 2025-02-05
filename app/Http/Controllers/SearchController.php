<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function autocomplete(Request $request)
    {
        $search = strtolower($request->input('query', ''));

        if (empty($search)) {
            return response()->json(['data' => []]);
        }

        // Get results from all entities
        $results = $this->getStudents($search)
            ->union($this->getStaffs($search))
            ->union($this->getInstructors($search))
            ->limit(10)
            ->get();

        return response()->json(['data' => $results]);
    }

    private function getUsers($search, $userType)
    {
        // Split the search string into individual terms (space-separated)
        $terms = explode(' ', strtolower($search));

        // Build the query based on the number of terms
        $query = User::join($userType, 'users.id', '=', "{$userType}.user_id")
            ->leftJoin('departments', "{$userType}.department_id", '=', 'departments.id')
            ->where("{$userType}.is_archived", false)
            ->select(
                'users.id',
                'users.first_name',
                'users.middle_name',
                'users.last_name',
                'users.email',
                'users.slug',
                'departments.name as department',
                "{$userType}.id as type_id",
                DB::raw("'{$userType}' as type") // Use the userType (e.g., 'student', 'admin', 'instructor')
            );

        // Ensure that all terms match fields (first_name, middle_name, or last_name)
        foreach ($terms as $term) {
            $query->where(function ($query) use ($term) {
                $query->where('users.first_name', 'LIKE', "%{$term}%")
                    ->orWhere('users.middle_name', 'LIKE', "%{$term}%")
                    ->orWhere('users.last_name', 'LIKE', "%{$term}%");
            });
        }

        return $query;
    }

    public function getStudents($search)
    {
        return $this->getUsers($search, 'students');
    }

    public function getStaffs($search)
    {
        return $this->getUsers($search, 'staffs');
    }

    public function getInstructors($search)
    {
        return $this->getUsers($search, 'instructors');
    }

}
